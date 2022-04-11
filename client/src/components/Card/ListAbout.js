import * as Mui from "@mui/material";
import React from "react";
import styled from "styled-components";
import { pink } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";

export const ListAbout = ({ text }) => {
  return (
    <Mui.Stack
      direction={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      spacing={2}
    >
      <Mui.Avatar sx={{ bgcolor: pink[200] }}>
        <DoneIcon sx={{ fontSize: 30 }} />
      </Mui.Avatar>
      <h3>{text}</h3>
    </Mui.Stack>
  );
};

const style = {
  Wrapper: styled.div``,
};
