import React from 'react';
import { Box, Typography } from '@mui/material';

const About = () => {
    return (
        <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                About This App
            </Typography>
            <Typography variant="body1">
                This Loan Calculator App is a modern, single-page web application built using React JS and Material UI. It allows users to calculate loan EMIs (Equated Monthly Installments), view a detailed amortization schedule, and see real-time currency conversions of their EMI using live exchange rates.
            </Typography>
        </Box>
    );
};

export default About;
