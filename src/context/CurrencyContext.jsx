// src/context/CurrencyContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const CurrencyContext = createContext();

// Custom hook for using the context
export const useCurrencyContext = () => useContext(CurrencyContext);

// Provider component
export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/INR`
        );
        setRates(response.data.conversion_rates);
      } catch (err) {
        console.error("Error fetching exchange rates", err);
        setError("Failed to fetch currency rates");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, [apiKey]);

  return (
    <CurrencyContext.Provider value={{ rates, loading, error }}>
      {children}
    </CurrencyContext.Provider>
  );
};
