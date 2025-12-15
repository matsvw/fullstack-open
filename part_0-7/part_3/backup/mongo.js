const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://phonebook:${password}@cluster0.tszt1iq.mongodb.net/phonebook?appName=Cluster0`
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } }

//mongoose.set('strictQuery', false)
//mongoose.connect(url, { family: 4 })

// Create a Mongoose client with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri, clientOptions)
//mongoose.connection.db.admin().command({ ping: 1 });
//console.log("Pinged your deployment. You successfully connected to MongoDB!");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

// create new person
if (process.argv.length >= 5) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })
  person.save().then(result => {
    console.log(result)
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
// list all persons
else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}





