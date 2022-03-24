import { colors } from "./base/colors";
import { breakpoints } from "./base/breakpoints";
import typography from "./base/typography";

export const Defalttheme = {
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  fonts: {
    title: "Oswald, sans-serif",
    main: "Poppins, sans-serif",
  },
  breakpoint: {
    xs: "only screen and (max-width: 0)",
    sm: "only screen and (max-width: 600px)",
    md: "only screen and (max-width: 900px)",
    lg: "only screen and (max-width: 1200px)",
    xl: "only screen and (max-width: 1536px)",
  },
};
