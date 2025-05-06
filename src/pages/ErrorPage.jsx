import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, useTheme } from "@mui/material";

const ErrorPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "8px",
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Something went wrong in the application.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          GO HOME
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorPage;
