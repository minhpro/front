import * as Mui from "@mui/material";
import React from "react";

export const LayoutTable = ({ button, children }) => {
  return (
    <Mui.Stack py={2} spacing={2}>
      {button}
      <Mui.Box>{children}</Mui.Box>
    </Mui.Stack>
  );
};
