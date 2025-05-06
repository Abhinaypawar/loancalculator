import React, { useEffect, useState } from "react";
import { useCurrencyContext } from "../context/CurrencyContext";
import { CircularProgress, Box, Typography } from "@mui/material";

const LiveData = () => {
  const { rates, loading, error } = useCurrencyContext();  // Access currency rates from context
  const [currency, setCurrency] = useState("USD");  // Default currency
  const [amount, setAmount] = useState(1);  // Default amount to convert
  const [convertedAmount, setConvertedAmount] = useState(1);

  // Handle currency conversion when the currency or amount changes
  useEffect(() => {
    if (rates[currency]) {
      setConvertedAmount(amount * rates[currency]);
    }
  }, [currency, amount, rates]);

  // Render loading, error, or data
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Live Currency Conversion
      </Typography>
      
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Typography variant="h6">Enter Amount (INR)</Typography>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem", width: "200px" }}
        />
        
        <Typography variant="h6">Select Currency</Typography>
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value)} 
          style={{ padding: "0.5rem", fontSize: "1rem", marginBottom: "1rem", width: "200px" }}
        >
          {Object.keys(rates).map((currencyKey) => (
            <option key={currencyKey} value={currencyKey}>
              {currencyKey}
            </option>
          ))}
        </select>

        <Typography variant="h5" sx={{ marginTop: "1rem" }}>
          Converted Amount: {convertedAmount.toFixed(2)} {currency}
        </Typography>
      </Box>
    </Box>
  );
};

export default LiveData;
