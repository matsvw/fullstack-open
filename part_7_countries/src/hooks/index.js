import { useState, useEffect } from 'react'
import countryService from '../services/countries'

export const useCountry = (name) => {

  const [country, setCountry] = useState(null)


  useEffect(() => {
    if (!name) {
      setCountry(null)
      return
    }

    const findCountry = async (name) => {
      const ret = await countryService.getCountry(name)
      console.log(`Search with '${name}' returned: `, ret)
      setCountry(ret)
    }

    findCountry(name)

  }, [name])

  return {data: country, found: country ? true : false }

}

