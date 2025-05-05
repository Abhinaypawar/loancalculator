import { useCurrencyContext } from "../context/CurrencyContext";
import useEmiCalculator from "../hooks/useEmiCalculator";
import LoanForm from "../components/LoanForm";
import EmiBreakdownTable from "../components/EmiBreakdownTable";

const Home = () => {
  const { emi, schedule, calculateEmi } = useEmiCalculator();

  const { currency, exchangeRates, setCurrency } = useCurrencyContext();

  const convertedEmi =
    emi && exchangeRates && currency && exchangeRates[currency]
      ? (emi * exchangeRates[currency]).toFixed(2)
      : null;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Loan Calculator Dashboard</h2>

      <LoanForm onCalculate={calculateEmi} />

      {emi && (
        <>
          <div style={{ marginTop: "1rem" }}>
            <label>Select Currency: </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {Object.keys(exchangeRates || {}).map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          <h3>
            EMI in {currency}: ₹{convertedEmi}
          </h3>

          <EmiBreakdownTable schedule={schedule} />
        </>
      )}
    </div>
  );
};

export default Home;
