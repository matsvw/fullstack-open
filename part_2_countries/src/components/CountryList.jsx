import CountryDetails from "./CountryDetails"

const CountryList = ({ countries }) => {
    if (!countries) {
        return <div>No countries found from server</div>
    }
    else if(countries.length === 0) {
        return <div>No countries found with the specified filter</div>
    }
    else if(countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if(countries.length === 1) {
        const country = countries[0]
        return (
            <CountryDetails country={country} />
        )
    }
    return (
        <div>
            {countries.map((country, index) =>
                <div key={country.cca2}>
                    {country.name.common}
                </div>
            )}
        </div>
    )

}

export default CountryList