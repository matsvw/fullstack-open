import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter,setFilter] = useState('')
  const [newPerson, setNewPerson] = useState({name: '', number: ''})

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }
  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event)
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(newPerson))
    setNewPerson({ name: '', number: '' })
  }

  const filerList = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={filerList}/>
      </div>
      <h2>Add a new person</h2>
      <form>
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(filter)).map((person, index) =>
        <div key={`${person.name}_${index}`}>{person.name} {person.number}</div>
      )}
      <br />
      <br />
      <div>debug: {newPerson.name} {newPerson.number}</div>
    </div>
  )
}

export default App