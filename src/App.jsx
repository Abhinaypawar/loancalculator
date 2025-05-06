import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import { createAppTheme } from './theme';
import { useThemeContext } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EmiCalculator from './pages/EmiCalculator';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import LiveData from './pages/LiveData';

function App() {
  const { mode } = useThemeContext();
  const theme = createAppTheme(mode);

  // Get current route using useLocation
  const location = useLocation();

  // Hide Navbar on ErrorPage
  const hideNavbar = location.pathname === '/error-page';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Conditionally render Navbar based on current route */}
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live-server" element={<LiveData />} />
        <Route path="/about" element={<About />} />
        <Route path="/error-page" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
