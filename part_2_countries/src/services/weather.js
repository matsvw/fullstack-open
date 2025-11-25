import axios from 'axios'
const baseUrl = 'https://api.met.no/weatherapi/locationforecast/2.0'

//https://api.met.no/weatherapi/locationforecast/2.0/compact?lon=29.5&lat=45.75

const getLocationWeather = (lat, lon) => {

  // Ensure the latitude and longitude are formatted correctly for the API request 
  const formattedLat = lat.toLocaleString('en-US', { useGrouping: false });
  const formattedLon = lon.toLocaleString('en-US', { useGrouping: false });

  const request = axios.get(`${baseUrl}/compact?lat=${formattedLat}&lon=${formattedLon}`);

  return request.then(response => response.data)
}

export default { getLocationWeather }