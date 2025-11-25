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
    if (persons.some(person => person.name === newPerson.name)) {
      const result = confirm(`${newPerson.name} is already added to phonebook. Replace the old number with a new one?`);
      if (!result) {
        return false
      }
      newPerson.id = persons.find(person => person.name === newPerson.name).id // use id of (first matching) existing person

      axios.put(`http://localhost:3001/persons/${newPerson.id}`, newPerson).then(response => {
        // update list to match server data
        if (response.status >= 200 && response.status < 300) {
          setPersons(persons.map(person => person.id !== newPerson.id ? person : response.data))
          return true
        }
      })
    }
    else {
    axios
      .post('http://localhost:3001/persons', newPerson)
      .then(response => {
        console.log(response.data)
        if (response.status >= 200 && response.status < 300) {
          setPersons(persons.concat(response.data))
          return true
        }
      })
    }
    return false // default return value if something goes wrong
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