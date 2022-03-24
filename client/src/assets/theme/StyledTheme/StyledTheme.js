import React from "react";
import { ThemeProvider } from "styled-components";
import { Defalttheme } from "../theme";
import GlobalStyled from "../global/global";

const StyledTheme = ({ children }) => {
  return (
    <ThemeProvider theme={Defalttheme}>
      <GlobalStyled />
      {children}
    </ThemeProvider>
  );
};

export default StyledTheme;
