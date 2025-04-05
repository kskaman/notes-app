import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme/theme";

interface ThemeManagerProps {
  children: React.ReactNode;
}

const ThemeManager = ({ children }: ThemeManagerProps) => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline provides a basic reset to help with consistent styling */}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeManager;
