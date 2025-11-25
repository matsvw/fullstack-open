import axios from 'axios'
const baseUrl = 'https://api.met.no/weatherapi/locationforecast/2.0/documentation'


//from country-> "latlng": [29.5, 45.75],
https://api.met.no/weatherapi/locationforecast/2.0/compact?lon=29.5&lat=45.75


//weather/png/ + timeseries.next_1_hours.summary.symbol_code + .png

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getCountry = name => {
  const request = axios.get(`${baseUrl}/name/${name.toLowerCase()}`)
  return request.then(response => response.data)
}

export default { getAll, getCountry }