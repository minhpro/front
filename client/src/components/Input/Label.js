import React from "react";
import * as Mui from "@mui/material";
import { Select } from "./Select";
import styled from "styled-components";
import { Text } from "./Text";

export const Label = ({ label, name, required, ...rest }) => {
  return (
    <Mui.Stack spacing={0.5} width={"100%"}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
      </Style.Label>
      <Select id={name} name={name} fullWidth required={required} {...rest} />
    </Mui.Stack>
  );
};

Label.Select = function ({ label, name, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5} width={"100%"}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
      </Style.Label>
      <Select id={name} name={name} fullWidth required={required} {...rest} />
    </Mui.Stack>
  );
};

Label.Text = function ({ label, name, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5} width={"100%"}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
      </Style.Label>
      <Text id={name} name={name} fullWidth required={required} {...rest} />
    </Mui.Stack>
  );
};

const Style = {
  Label: styled.label`
    font-size: "1,7rem";
    span {
      color: red;
      transform: translateY(-6px);
    }
  `,
};
