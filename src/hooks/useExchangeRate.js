// src/hooks/useExchangeRates.js

import { useEffect, useState } from "react";
import axios from "axios";

// Accessing the API key from the environment variables
const API_KEY = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );
        setExchangeRates(response.data.conversion_rates);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching exchange rates:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { exchangeRates, loading, error };
};

export default useExchangeRates;
