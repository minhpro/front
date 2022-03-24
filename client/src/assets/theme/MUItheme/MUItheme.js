import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { Defalttheme } from "../theme";

const theme = createTheme({
  ...Defalttheme,
});

const MUItheme = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MUItheme;
