
import React from "react";
import "./AmortizationSchedule.css";

const AmortizationSchedule = ({ schedule, currency, conversionRate }) => {
  return (
    <div className="schedule-container">
      <h3 className="schedule-title">Amortization Schedule ({currency})</h3>
      <div className="table-wrapper">
        <table className="amortization-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) => (
              <tr key={item.month}>
                <td>{item.month}</td>
                <td>
                  {currency} {(item.principal * conversionRate).toFixed(2)}
                </td>
                <td>
                  {currency} {(item.interest * conversionRate).toFixed(2)}
                </td>
                <td>
                  {currency} {(item.balance * conversionRate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AmortizationSchedule;
