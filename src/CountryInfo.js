import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryInfo = () => {
  const [countryData, setCountryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3/all");
        setCountryData(response.data);
      } catch (error) {
        setError("Error fetching data from the API");
      }
    };
    fetchCountryData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!countryData) {
    return <div>Loading...</div>;
  }

  return <div></div>;
};

export default CountryInfo;
