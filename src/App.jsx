import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createAppTheme } from './theme';
import { useThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EmiCalculator from './pages/EmiCalculator';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';

function App() {
  const { mode } = useThemeContext();
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/error-page" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
