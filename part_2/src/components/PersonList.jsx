const PersonList = ({ personsToShow, deletePerson }) => {
  return (
    <div>   
        {personsToShow.map((person, index) =>
            <div key={`${person.name}_${index}`}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></div>    
        )}
    </div>
    )

}

export default PersonList