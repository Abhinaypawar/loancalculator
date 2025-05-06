import React from "react";
import { useState } from "react";
import LoanForm from "../components/LoanForm";
import useEmiCalculator from "../hooks/useEmiCalculator";
import EmiBreakdownTable from "../components/EmiBreakdownTable";

const EmiCalculator = () => {
  const [loanDetails, setLoanDetails] = useState(null);

  const handleCalculate = ({ principal, rate, duration }) => {
    setLoanDetails({
      principal: Number(principal),
      rate: Number(rate),
      duration: Number(duration),
    });
  };

  const emi = useEmiCalculator(
    loanDetails?.principal,
    loanDetails?.rate,
    loanDetails?.duration
  );

  return (
    <div>
      <LoanForm onCalculate={handleCalculate} />
      {loanDetails && (
        <>
          <h2>Monthly EMI: ₹{emi}</h2>
          <h3>Loan Details</h3>
          
          <EmiBreakdownTable
            principal={loanDetails.principal}
            rate={loanDetails.rate}
            duration={loanDetails.duration}
            emi={emi}
          />
        </>
      )}
    </div>
  );
};

export default EmiCalculator;
