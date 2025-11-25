import { useState } from 'react'

const PersonForm = ({ addPerson }) => {
  const [newPerson, setNewPerson] = useState({name: '', number: ''})

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value})
  }
  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value})
  }

  const addNewPerson = (event) => {
    event.preventDefault()
    if (addPerson(newPerson)) {
      setNewPerson({ name: '', number: '' })
    }
  }

  return (
      <form>
        <div>
          name: <input value={newPerson.name} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPerson.number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
  )
}       

export default PersonForm


