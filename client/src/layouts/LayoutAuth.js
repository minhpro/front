import * as Mui from "@mui/material";
import { SuiLogo } from "components/Sui";
import { getImage } from "functions";
import React from "react";
import { Outlet } from "react-router-dom";
export const LayoutAuth = () => {
  return (
    <Mui.Grid container sx={{ height: "100vh" }}>
      <Item bgcolor={"grey.500"}>
        <Mui.Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "100%" }}
        >
          <Mui.Stack>
            <img src={getImage.getPng("logo")} style={{ width: "300px" }} />
            <h1>Hệ thống khảo thí EBD</h1>
          </Mui.Stack>
        </Mui.Stack>
      </Item>
      <Item>
        <Mui.Stack
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ height: "100%" }}
        >
          <Outlet />
        </Mui.Stack>
      </Item>
    </Mui.Grid>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item xs={12} md={6} {...rest}>
      {children}
    </Mui.Grid>
  );
};
