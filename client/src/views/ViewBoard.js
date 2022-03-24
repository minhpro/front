import React from "react";
import * as Mui from "@mui/material";

export const ViewBoard = ({ children }) => {
  return (
    <Mui.Box
      bgcolor={"white.main"}
      sx={{ boxShadow: "0 0 20px 0 rgb(76 87 125 / 2%)" }}
      p={2}
      borderRadius={2}
    >
      {children}
    </Mui.Box>
  );
};
