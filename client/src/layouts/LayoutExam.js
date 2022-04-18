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
      <Outlet />
    </>
  );
};
