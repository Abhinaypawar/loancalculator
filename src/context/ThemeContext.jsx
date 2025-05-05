import React, { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');
  
    const toggleTheme = () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  