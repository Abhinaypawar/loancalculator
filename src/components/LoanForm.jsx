import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";

const LoanForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const principal = parseFloat(amount);
    const rate = parseFloat(interest);
    const months = parseInt(tenure);

    if (principal && rate && months) {
      onCalculate({ amount: principal, interest: rate, tenure: months });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Loan Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Interest Rate (%)"
            variant="outlined"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Term (Years)"
            variant="outlined"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </Grid>
      </Grid>

      <Button
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#007bff",
          "&:hover": { backgroundColor: "#0056b3" },
          fontSize: "16px",
          py: 1.5,
          width: "150px",
          mt: 2,
        }}
      >
        Calculate
      </Button>
    </Box>
  );
};

export default LoanForm;
