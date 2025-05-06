import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ThemeProvider as ThemeContextProvider } from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> {/* Only wrap the app with Router here */}
      <ThemeContextProvider>
        <CurrencyProvider>
          <App />
        </CurrencyProvider>
      </ThemeContextProvider>
    </Router>
  </StrictMode>
);
