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

morgan.token('body', (req) => JSON.stringify(req.body))
//app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get('/', (request, response) => {
  response.send('<p>Welcome to the Phonebook API</p>')
})

app.get('/info', async (request, response) => {
  try {
    const count = await Person.countDocuments({});
    res.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date()}</p>
    `);
  } catch (err) {
    res.status(500).send('Error fetching count');
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

  Person.findById(id).then(person => {
    response.json(person)
  })

  response.status(404).json({ error: `Person with id ${id} not found` }).end()

})

app.put('/api/persons/:id', async (request, response) => {
  try {
    const person = new Person(req.body); // Convert body into Mongoose model
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id).then(() => {
    response.status(204).end()
  })

  response.status(404).end() // person not found

})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})