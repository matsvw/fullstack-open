const PersonList = ({ personsToShow }) => {
  return (
    <div>   
        {personsToShow.map((person, index) =>
            <div key={`${person.name}_${index}`}>{person.name} {person.number}</div>    
        )}
    </div>
    )

}

export default PersonList