import React, { useState } from "react";

import LoanForm from "../components/LoanForm";
import EmiBreakdownTable from "../components/EmiBreakdownTable";
import AmortizationSchedule from "../components/AmortizationSchedule";
import useExchangeRates from "../hooks/useExchangeRate"; // Custom hook to fetch exchange rates

const Home = () => {
  const { exchangeRates, loading, error } = useExchangeRates();
  const [currency, setCurrency] = useState("USD");
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState(null); // Hold amount, interest, tenure

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
    <div style={{ padding: "2rem" }}>
      <h2>Loan Calculator Dashboard</h2>

      <LoanForm onCalculate={calculateEmi} />

      {loading && <p>Loading exchange rates...</p>}
      {error && <p>{error}</p>}

      {emi !== null && formData && (
        <>
          <div style={{ marginTop: "1rem" }}>
            <h3>
              EMI in {currency}: {currency} {convertedEmi}
            </h3>

            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  style={{
                    padding: "15px",
                    border: "1px solid #ccc",
                    opacity: "0.7",
                    flex: "1 1 100%",
                    maxWidth: "200px",
                  }}
                >
                  {exchangeRates &&
                    Object.keys(exchangeRates).map((curr) => (
                      <option key={curr} value={curr}>
                        {curr}
                      </option>
                    ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setEmi(null);
                  setFormData(null);
                  setSchedule([]);
                }}
                style={{
                  padding: "15px",
                  border: "1px solid #ccc",
                  
                  color:"purple",
                  opacity: "0.7",
                  flex: "1 1 100%",
                  maxWidth: "150px",
                  cursor: "pointer",
                }}
              >
                Reset Table
              </button>
            </div>
          </div>

          <AmortizationSchedule
            schedule={schedule}
            currency={currency}
            conversionRate={conversionRate}
          />
        </>
      )}
    </div>
  );
};

export default Home;
