import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import * as Mui from "@mui/material";
import * as Ex from "Example";

export const LayoutExam = () => {
  return (
    <>
      <Ex.Header.Nav c={"white"} />
      <Ex.Header />

      <Style.Main className="container">
        <Mui.Stack direction={{ xs: "column", md: "row" }}>
          <Mui.Box width={"100%"}>
            <Outlet />
          </Mui.Box>
        </Mui.Stack>
      </Style.Main>
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
