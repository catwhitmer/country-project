import React, { useState } from "react";
import axios from "axios";

const CountryInfo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://restcountries.com/v3/name/${searchQuery}`
      );
      console.log(response.data);
      setCountryData(response.data);
    } catch (error) {
      setError("Error fetching data from the API");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      {countryData &&
        countryData.map((country) => (
          <div key={country.cca3}>
            <div className="panelContainer">
              <div className="firstPanel">
                <h2>{country.name.common}</h2>
                <h2>{country.name.official}</h2>
                {/* <h2>{currency}</h2>    */}
                {/* <h2>{currency symbol}</h2> */}
                {/* <h2>{language}</h2> */}
                <h2>{country.capital}</h2>
                <h2>{country.population}</h2>
              </div>
              <div className="secondPanel">
                <img
                  className="image"
                  src={country.flags[0]}
                  alt={`${country.name.common} Flag`}
                />
                <img
                  className="image"
                  src={country.coatofarms}
                  alt={`${country.name.common} Coat of Arms`}
                />
              </div>
            </div>
          </div>
        ))}
      {error && <div>{error}</div>}
    </div>
  );
};

export default CountryInfo;
