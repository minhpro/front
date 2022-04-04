import React from "react";
import * as Mui from "@mui/material";
import styled from "styled-components";
import * as Co from "components";

export const UserInfor = ({ name, value }) => {
  return (
    <Mui.Stack direction={"row"} alignItems={"flex-end"}>
      <Mui.Stack width={120}>
        <Co.Text.Body.Medium>{name || "Name"}:</Co.Text.Body.Medium>{" "}
      </Mui.Stack>
      <Mui.Stack>
        <Co.Text.Normal.Medium> {value}</Co.Text.Normal.Medium>
      </Mui.Stack>
    </Mui.Stack>
  );
};

const Style = {
  NameWrapper: styled.div``,
};
