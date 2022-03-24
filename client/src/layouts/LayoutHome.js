import * as Mui from "@mui/material";
import * as Ex from "Example";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Frame from "assets/icons/Frame.svg";
import { EuiNavMenu } from "components/Eui";
import navRouter from "router/navRouter";

export const LayoutHome = () => {
  return (
    <>
      <Ex.Header />
      <Style.Main className="container">
        <Mui.Stack direction={{ xs: "column", md: "row" }}>
          <Style.Nav>
            <Mui.Stack spacing={2}>
              {navRouter.data.map((data, i) => {
                return <EuiNavMenu data={data} key={i} />;
              })}
            </Mui.Stack>
          </Style.Nav>
          <Mui.Box width={"100%"}>
            <Outlet />
          </Mui.Box>
        </Mui.Stack>
      </Style.Main>
      <p>footer</p>
    </>
  );
};

const Style = {
  Main: styled.main`
    margin: 20px 0;
    display: block;
    width: 100%;
  `,
  Nav: styled.nav`
    min-width: 300px;
  `,
};
