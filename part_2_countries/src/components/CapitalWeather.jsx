import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CapitalWeather = ({ country }) => {

    const [units, setUnits] = useState(null)
    const [instantWeather, setInstantWeather] = useState(null)
    const [symbol, setSymbol] = useState(null)

    const hook = () => {
        if (country?.capitalInfo?.latlng?.length === 2) {
            weatherService
                .getLocationWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
                .then(weatherData => {
                    //Assuming the weather data structure contains the necessary fields
                    setInstantWeather(weatherData.properties.timeseries[0].data.instant.details)
                    setUnits(weatherData.properties.meta.units)
                    setSymbol(weatherData.properties.timeseries[0].data.next_1_hours.summary.symbol_code)
                })
        }
    }

    useEffect(hook, [])

    if (!country || !instantWeather || !units || !symbol) {
        return null
    }
    return (
        <div>
            <div>Temperature {instantWeather.air_temperature} {units.air_temperature}</div>
            <div>Wind speed {instantWeather.wind_speed} {units.wind_speed}</div>
            <img src={`./weather/png/${symbol}.png`} alt={`Weather symbol ${symbol}`} />
        </div>
    )
}

export default CapitalWeather
