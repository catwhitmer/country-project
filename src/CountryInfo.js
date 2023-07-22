import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const SearchBar = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;

const Panel = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 200px;
`;


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
      <SearchBar
        type="text"
        placeholder="Search for a country..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredCountries.map((country) => (
        <div key={country.cca3}>
          <Panel>
            <h2>{country.name.common}</h2>
            <h2>{country.name.official}</h2>
          </Panel>
          <Panel>
            <Image src={country.flags[0]} alt={`${country.name.common} Flag`} />
          </Panel>
        </div>
      ))}
    </div>
  );
};

export default CountryInfo;
