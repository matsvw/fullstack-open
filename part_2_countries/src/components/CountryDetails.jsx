import CapitalWeather from "./CapitalWeather"

const CountryDetails = ({ country }) => {
    if (!country) {
        return null
    }  
    return (
        <div>
            <h2>{country.name.common}</h2>
            <div>Capital: {country.capital && country.capital[0]}</div> 
            <div>Area: {country.area} km²</div>
            <h3>Languages:</h3>
            <ul>
                {country.languages && Object.values(country.languages).map((language, index) =>
                    <li key={index}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
            <h2>Weather in {country.capital && country.capital[0]}</h2>
            <CapitalWeather country={country} />
        </div>
    )
}

export default CountryDetails