import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getCountry = async (name) => {
  try {
    const ret = await axios.get(`${baseUrl}/name/${name.toLowerCase()}`)
    return ret.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}

export default { getAll, getCountry }