const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
console.log('connecting to', uri)
mongoose.connect(uri, clientOptions)
  .then(result => {
    console.log(result)
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /(?:\d{2}-\d{6,}|\d{3}-\d{5,})/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)