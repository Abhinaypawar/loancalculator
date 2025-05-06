import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const AmortizationSchedule = ({ schedule, currency, conversionRate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 4,
        mx: "auto",
        p: isMobile ? 1 : 2,
        maxWidth: 1200,
        overflowX: "hidden", // ✅ No row scroll
      }}
    >
      <Typography
        variant={isMobile ? "subtitle1" : "h5"}
        gutterBottom
        align="left"
        sx={{
          fontWeight: 600,
          pl: isMobile ? 0.5 : 1,
          fontSize: isMobile ? "1rem" : "1.5rem",
        }}
      >
        Amortization Schedule ({currency})
      </Typography>

      <TableContainer sx={{ maxHeight: 400, overflowX: "hidden" }}>
        <Table stickyHeader size="small" aria-label="amortization table">
          <TableHead>
            <TableRow>
              {["Month", "Principal", "Interest", "Remaining Balance"].map(
                (header) => (
                  <TableCell
                    key={header}
                    sx={{
                      fontWeight: "bold",
                      fontSize: isMobile ? "0.6rem" : "0.9rem",
                      whiteSpace: "nowrap",
                      padding: isMobile ? "4px 6px" : "12px 16px", // ⬅️ tighter padding on mobile
                    }}
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((item) => (
              <TableRow key={item.month}>
                <TableCell
                  sx={{
                    fontSize: isMobile ? "0.6rem" : "0.9rem",
                    padding: isMobile ? "4px 6px" : "12px 16px",
                  }}
                >
                  {item.month}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: isMobile ? "0.6rem" : "0.9rem",
                    padding: isMobile ? "4px 6px" : "12px 16px",
                  }}
                >
                  {currency} {(item.principal * conversionRate).toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: isMobile ? "0.6rem" : "0.9rem",
                    padding: isMobile ? "4px 6px" : "12px 16px",
                  }}
                >
                  {currency} {(item.interest * conversionRate).toFixed(2)}
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: isMobile ? "0.6rem" : "0.9rem",
                    padding: isMobile ? "4px 6px" : "12px 16px",
                  }}
                >
                  {currency} {(item.balance * conversionRate).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AmortizationSchedule;
