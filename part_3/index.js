require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
//const cors = require('cors')

const app = express()

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

app.post('/api/persons', async (request, response, next) => {
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

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).json({ error: `Person with id ${id} not found` });
      }
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', async (request, response, next) => {

  const { id } = request.params;
  const { name, number } = request.body

  /* Keeping as example of alternative update method
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
  */

  Person.findById(id)
    .then(person => {
      if (!person) {
        return response.status(404).json({ error: `Person with id ${id} not found` });
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))

});

app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    const deletedPerson = await Person.findByIdAndDelete(request.params.id);
    if (!deletedPerson) {
      return response.status(404).json({ error: `Person with id ${request.params.id} not found` });
    }
    response.status(204).end(); // No content
  } catch (error) {
    next(error)
  }

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})