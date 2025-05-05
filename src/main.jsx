import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider as ThemeContextProvider } from './context/ThemeContext'; // ✅ your custom ThemeContext provider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider> {/* ✅ Wrap App with your own provider */}
      <App />
    </ThemeContextProvider>
  </StrictMode>
);
