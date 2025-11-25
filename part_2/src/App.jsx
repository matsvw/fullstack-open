import { useState } from 'react'

import Filter from './components/Filter'
import Person from './components/PersonForm'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [filter,setFilter] = useState('')

  const addPerson = (newPerson) => {
    console.log('button clicked', event)
    if (persons.some(person => person.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`)
      return false
    }
    setPersons(persons.concat(newPerson))
    return true
  }

  const filterList = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={filterList} />
      <h2>Add a new person</h2>
      <PersonForm addPerson={addPerson} />
      <h2>Numbers</h2>
      <PersonList personsToShow={persons.filter(person => person.name.toLowerCase().includes(filter))} />
    </div>
  )
}

export default App