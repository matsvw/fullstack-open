import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

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