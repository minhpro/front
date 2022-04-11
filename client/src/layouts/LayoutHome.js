import * as Mui from "@mui/material";
import * as Ex from "Example";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

export const LayoutHome = () => {
  return (
    <>
      <Ex.Header.Nav />
      <Mui.Stack direction={{ xs: "column", md: "row" }}>
        <Style.Main>
          <Outlet />
        </Style.Main>
      </Mui.Stack>

      <Ex.Footer />
    </>
  );
};

const Style = {
  Main: styled.main`
    display: block;
    width: 100%;
    overflow-x: hidden;
  `,
  Nav: styled.nav`
    min-width: 300px;
  `,
};
