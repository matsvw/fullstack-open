const mongoose = require('mongoose')

const uri = process.env.MONGODB_URI
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
console.log('connecting to', uri)
mongoose.connect(uri, clientOptions)
  // eslint-disable-next-line no-unused-vars
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


// TODO - this schema needs to be updated as necessary
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  author: {
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

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)