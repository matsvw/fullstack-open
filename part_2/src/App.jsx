import { useState, useEffect } from 'react'
import personService from './services/persons'

import Filter from './components/Filter'
import PersonList from './components/PersonList'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    personService
      .getAll()
      .then(personList => {
        setPersons(personList)
      })
  }

  useEffect(hook, [])
  console.log('render', persons.length, 'persons')

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    const confirmDelete = confirm(`Delete ${person.name} ?`)
    if (confirmDelete) {
      personService
        .deleteEntry(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          alert(`the person '${person.name}' was already deleted from server`)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addPerson = async (newPerson) => {
    try {
      // Check if person already exists
      const existing = persons.find(person => person.name === newPerson.name);

      if (existing) {
        const confirmUpdate = confirm(
          // already done so exercise 2.15 is ready
          `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`
        );

        if (!confirmUpdate) {
          return false; // User canceled
        }

        // Prepare updated person object
        const updatedPerson = { ...newPerson, id: existing.id };

        // Update on server
        const response = await personService.update(existing.id, updatedPerson);

        // Update state using functional update
        setPersons(prev =>
          prev.map(person => person.id !== existing.id ? person : response)
        );

        return true; // Success
      }

      // If person does not exist, create new
      const addedPerson = await personService.create(newPerson);

      setPersons(prev => prev.concat(addedPerson));

      return true; // Success
    } catch (error) {
      console.error(error);

      // Show user-friendly message
      alert(`Operation failed: ${error.response?.data?.error || error.message}`);

      return false; // Failure
    }
  };

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
      <PersonList personsToShow={persons.filter(person => person.name.toLowerCase().includes(filter))} deletePerson={deletePerson} />
    </div>
  )
}

export default App