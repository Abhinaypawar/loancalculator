
import { createTheme } from '@mui/material/styles';

// Function to return theme configuration based on mode
export const getDesignTokens = (mode) => ({
  palette: {
    mode, // this will toggle between 'light' and 'dark'
    ...(mode === 'light'
      ? {
          primary: {
            main: '#1976d2', // Blue for light mode
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
        }
      : {
          primary: {
            main: '#90caf9', // Light blue for dark mode
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
  typography: {
    fontFamily: 'Roboto, Arial', // Default font
  },
});

// Create and export the app's theme based on the mode (light/dark)
export const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode,
    },
  });
