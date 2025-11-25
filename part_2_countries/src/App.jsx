import { useState, useEffect } from 'react'
import countryService from './services/countries'

import Filter from './components/Filter'
import CountryList from './components/CountryList'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const hook = () => {
    console.log('effect')
    countryService
      .getAll()
      .then(countryList => {
        setCountries(countryList)
      })
  }

  useEffect(hook, [])
  console.log('render', countries ? countries.length : 0, 'countries')

  const setTimeoutMsg = (message, isError=true) => {
        if (isError) {
          setErrorMessage(message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)            
        } else {
          setInfoMessage(message)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)            
        }
  }

  const filterList = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  return (
    <div>
      <Filter filter={filter} handleFilterChange={filterList} />
      <br/>
      {countries && (
        <CountryList countries={countries.filter(country => country.name.common.toLowerCase().startsWith(filter))} />
      )}
    </div>
  )
}

export default App