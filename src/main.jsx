// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { CurrencyProvider } from "./context/CurrencyContext";
import { ThemeProvider as ThemeContextProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </ThemeContextProvider>
  </StrictMode>
);
