const PersonList = ({ personsToShow, deletePerson }) => {
  return (
    <div>   
        {personsToShow.map((person, index) =>
            <li key={`${person.name}_${index}`} className="person-item">
                <div>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></div>    
            </li>
        )}
    </div>
    )

}

export default PersonList