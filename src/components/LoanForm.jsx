
import React, { useState } from "react";

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
    <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "space-between",
            }}
          >
            <input
              type="text"
              placeholder="Loan Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="numeric"
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                flex: "1 1 30%",
                minWidth: "200px",
              }}
            />
            <input
              type="text"
              placeholder="Interest Rate (%)"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              inputMode="numeric"
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                flex: "1 1 30%",
                minWidth: "200px",
              }}
            />
            <input
              type="text"
              placeholder="Term (Years)"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              inputMode="numeric"
              style={{
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                flex: "1 1 30%",
                minWidth: "200px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px",
                fontSize: "16px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                flex: "1 1 100%",
                maxWidth: "200px",
              }}
            >
              Calculate
            </button>
          </form>
  );
};

export default LoanForm;
