import React, { useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";

import LoanForm from "../components/LoanForm";
import EmiBreakdownTable from "../components/EmiBreakdownTable";
import AmortizationSchedule from "../components/AmortizationSchedule";
import useExchangeRates from "../hooks/useExchangeRate";

const Home = () => {
  const { exchangeRates, loading, error } = useExchangeRates();
  const [currency, setCurrency] = useState("USD");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState(null);

  const calculateEmi = ({ amount, interest, tenure }) => {
    const monthlyRate = interest / 12 / 100;
    const emiAmount =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure * 12)) /
      (Math.pow(1 + monthlyRate, tenure * 12) - 1);

    setEmi(emiAmount);
    setFormData({ amount, interest, tenure });

    const paymentSchedule = [];
    let balance = amount;

    for (let month = 1; month <= tenure * 12; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiAmount - interestPayment;
      balance -= principalPayment;

      paymentSchedule.push({
        month,
        principal: principalPayment,
        interest: interestPayment,
        totalPayment: emiAmount,
        balance: balance < 0 ? 0 : balance,
      });
    }

    setSchedule(paymentSchedule);
  };

  const convertedEmi =
    emi && exchangeRates && exchangeRates[currency]
      ? (emi * exchangeRates[currency]).toFixed(2)
      : null;

  const conversionRate = exchangeRates?.[currency] || 1;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator Dashboard
      </Typography>
      <LoanForm onCalculate={calculateEmi} />
      {loading && <Typography>Loading exchange rates...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {emi !== null && formData && (
        <>
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              EMI in {currency}: {currency} {convertedEmi}
            </Typography>
            <Box
              mt={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <FormControl
                sx={{
                  width: "160px",
                  flexShrink: 0,
                }}
                size="small"
              >
                <InputLabel>Currency</InputLabel>
                <Select
                  value={currency}
                  label="Currency"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {exchangeRates &&
                    Object.keys(exchangeRates).map((curr) => (
                      <MenuItem key={curr} value={curr}>
                        {curr}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* Reset Button */}
              <Box sx={{ ml: "auto" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    height: "40px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onClick={() => {
                    setEmi(null);
                    setFormData(null);
                    setSchedule([]);
                  }}
                >
                  Reset Table
                </Button>
              </Box>
            </Box>
          </Box>
          <AmortizationSchedule
            schedule={schedule}
            currency={currency}
            conversionRate={conversionRate}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
