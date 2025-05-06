import { useState } from "react";

const useEmiCalculator = () => {
  const [emi, setEmi] = useState(null);
  const [schedule, setSchedule] = useState([]);

  const calculateEmi = ({ amount, interest, tenure }) => {
    const principal = parseFloat(amount);
    const rate = parseFloat(interest);
    const months = parseInt(tenure) * 12;

    if (!principal || !rate || !months) return;

    const monthlyRate = rate / 12 / 100;
    const emiAmount =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setEmi(emiAmount);

    let balance = principal;
    const paymentSchedule = [];

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emiAmount - interestPayment;
      balance -= principalPayment;

      paymentSchedule.push({
        month: i,
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
