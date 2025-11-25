const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Find countries starting with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

export default Filter
