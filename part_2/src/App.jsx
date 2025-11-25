import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map((person, index) =>
        <div key={`${person.name}_${index}`}>{person.name} {person.number}</div>
      )}
      <br />
      <br />
      <div>debug: {newPerson.name} {newPerson.number}</div>
    </div>
  )
}

export default App