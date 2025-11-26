require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
//const cors = require('cors')

const app = express()

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (request) => JSON.stringify(request.body))
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<p>Welcome to the Phonebook API</p>')
})

app.get('/info', async (request, response) => {
  try {
    const count = await Person.countDocuments({});
    response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `);
  } catch (err) {
    response.status(500).send('Error fetching count');
  }

})

app.get('/api/persons', (request, response) => {
  //response.json(persons)
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.post('/api/persons', async (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number missing'
    })
  }

  const existingPerson = await Person.findOne({ name: body.name });
  if (existingPerson) {
    return response.status(400).json({ error: 'Name must be unique' });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })

})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findById(id
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).json({ error: `Person with id ${id} not found` });
      }
    })
    .catch(err => {
      console.error(err);
      response.status(400).json({ error: err.message });
    })
  )
})

app.put('/api/persons/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const update = {
      name: request.body.name,
      number: request.body.number
      // do NOT include _id in the update payload
    };

    const updated = await Person.findByIdAndUpdate(id, update, {
      new: true,           // return the updated document
      runValidators: true, // run schema validators on update
      context: 'query',    // needed for some validators in updates
      upsert: false        // do not create a new doc if not found
    });

    if (!updated) {
      return response.status(404).json({ error: `Person with id ${id} not found` });
    }

    response.json(updated);
  } catch (err) {
    // If id is malformed, Mongoose will throw a CastError → 400
    response.status(400).json({ error: err.message });
  }
});


app.delete('/api/persons/:id', async (request, response) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(request.params.id);
    if (!deletedPerson) {
      return response.status(404).json({ error: `Person with id ${request.params.id} not found` });
    }
    response.status(204).end(); // No content
  } catch (err) {
    response.status(400).json({ error: err.message });
  }

})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})