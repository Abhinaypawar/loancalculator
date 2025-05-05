import { useState } from "react";

const useEmiCalculator = () => {
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEmi = ({ amount, interest, tenure }) => {
    const monthlyRate = interest / 12 / 100;
    const emiAmount =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
      (Math.pow(1 + monthlyRate, tenure) - 1);

    setEmi(emiAmount);

    const paymentSchedule = [];
    let balance = amount;

    for (let month = 1; month <= tenure; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiAmount - interestPayment;
      balance -= principalPayment;

      paymentSchedule.push({
        month,
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        totalPayment: emiAmount.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    setSchedule(paymentSchedule);
  };

  return { emi, schedule, calculateEmi };
};

export default useEmiCalculator;
export { useEmiCalculator };
