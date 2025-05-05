import React, { useState } from "react";

const LoanForm = ({ onCalculate }) => {
  const [amount, setAmount] = useState("");
  const [interest, setInterest] = useState("");
  const [tenure, setTenure] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCalculate({ amount, interest, tenure });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Loan Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Interest Rate"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
      />
      <input
        type="number"
        placeholder="Tenure (months)"
        value={tenure}
        onChange={(e) => setTenure(e.target.value)}
      />
      <button type="submit">Calculate</button>
    </form>
  );
};

export default LoanForm;
