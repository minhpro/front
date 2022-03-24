import * as Mui from "@mui/material";

import React from "react";
import styled from "styled-components";

export const ViewContent = ({ title, children }) => {
  return (
    <Mui.Stack width={"100%"}>
      <Mui.Stack direction={"row"} alignItems={"center"} pb={2}>
        <Style.H2>{title || "title"}</Style.H2>
      </Mui.Stack>
      <Mui.Box width={"100%"}>{children}</Mui.Box>
    </Mui.Stack>
  );
};

const Style = {
  H2: styled.h2`
    cursor: pointer;
    :hover {
      color: red;
    }
  `,
};
