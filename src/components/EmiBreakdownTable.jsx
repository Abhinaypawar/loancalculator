import React from "react";

const EmiBreakdownTable = ({ principal, rate, duration, emi }) => {
  let balance = principal;
  const monthlyRate = rate / 12 / 100;

  const rows = [];

  for (let i = 1; i <= duration; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = emi - interest;
    balance -= principalPaid;

    rows.push({
      month: i,
      principalPaid: principalPaid.toFixed(2),
      interestPaid: interest.toFixed(2),
      balance: balance > 0 ? balance.toFixed(2) : 0,
    });
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Month</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr key={idx}>
            <td>{row.month}</td>
            <td>{row.principalPaid}</td>
            <td>{row.interestPaid}</td>
            <td>{row.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmiBreakdownTable;
