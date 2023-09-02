import React, { useState } from "react";
import axios from "axios";

const CountryInfo = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [countryData, setCountryData] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setErrors([]); // Clear previous errors

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${searchQuery}`
      );
      console.log(response.data);
      setCountryData(response.data);
    } catch (error) {
      setErrors([...errors, "Error fetching data from the API"]);
      setCountryData(null);
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

      {countryData && errors.length === 0 ? (
        countryData.map((country) => (
          <div key={country.cca3}>
            <div className="panelContainer">
              <div className="infoPanel">
                <h3>Common Name: {country.name.common}</h3>
                <h3>Official Name: {country.name.official}</h3>
                <h3>Currency: {Object.values(country.currencies)[0].name}</h3>
                <h3>Currency Symbol: {Object.values(country.currencies)[0].symbol}</h3>
                <h3>Language: {Object.values(country.languages)}</h3>
                <h3>Capital City: {country.capital}</h3>
                <h3>Population: {country.population}</h3>
              </div>

              <div className="flagPanel">
                <img
                  className="image"
                  src={country.flags.png}
                  alt={`${country.name.common} Flag`}
                />
                <img
                  className="image"
                  src={country.coatOfArms.png}
                  alt={`${country.name.common} Coat of Arms`}
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
        {errors.length > 0 ? (
          <div>Error(s) : {errors.join(", ")}</div>
        ) : (
          <div>Loading...</div>
        )}
        </div>
      )}
    </div>
  );
};

export default CountryInfo;
