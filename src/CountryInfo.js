import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = () => {
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3/all");
        console.log(response.data);
        setCountryData(response.data);
      } catch (error) {
        setError("Error fetching data from the API");
      }
    };
    fetchCountryData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!countryData) {
    return <div>Loading...</div>;
  }

  const filteredCountries = countryData.filter((country) => {
    return (
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.name.official.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredCountries.map((country) => (
        <div key={country.cca3}>
          <div>
            <h2>{country.name.common}</h2>
            {}
          </div>
          <div>
            <img src={country.flags[0]} alt={`${country.name.common} Flag`} />
            <img/>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
