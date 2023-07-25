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
      setCountryData(response.data);
    } catch (error) {
      setError("Error fetching data from the API");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSearchSubmit}>
        <input
          className="searchBar"
          type="text"
          placeholder="Search for a country..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
      {countryData && !error ? (
        countryData.map((country) => (
          <div className="panelContainer" key={country.cca3}>
            <div className="infoPanel">
              <h2>Common Name: {country.name.common}</h2>
              <h2>Official Name: {country.name.official}</h2>
              <h2>Currency: {Object.values(country.currencies)[0].name}</h2>
              <h2>
                Currency Symbol: {Object.values(country.currencies)[0].symbol}
              </h2>
              <h2>Language: {Object.values(country.languages)}</h2>
              <h2>Country Capital: {country.capital}</h2>
              <h2>Population: {country.population}</h2>
            </div>
            <div className="flagPanel">
              <img
                className="image"
                src={country.flags[0]}
                alt={`${country.name.common} Flag`}
              />
              <img
                className="image"
                src={country.coatOfArms}
                alt={`${country.name.common} Coat of Arms`}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="panelContainer">
          {error && <div className="infoPanel">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
