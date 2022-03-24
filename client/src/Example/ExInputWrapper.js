import styled from "styled-components";
import * as Mui from "@mui/material";

import { EuiInput } from "components/Eui";
import React from "react";

export const ExInputWrapper = () => {
  return <div>ExInputWrapper</div>;
};

ExInputWrapper.Select = function ({ name, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {name} <span> {required ? "*" : null}</span>
      </Style.Label>
      <EuiInput.Select
        id={name}
        name={name}
        fullWidth
        required={required}
        {...rest}
      />
    </Mui.Stack>
  );
};

ExInputWrapper.Basic = function ({ name, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {name} <span> {required ? "*" : null}</span>
      </Style.Label>
      <EuiInput id={name} name={name} fullWidth required={required} {...rest} />
    </Mui.Stack>
  );
};

ExInputWrapper.Multiline = function ({ name, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {name} <span> {required ? "*" : null}</span>
      </Style.Label>
      <EuiInput.Multiline
        id={name}
        name={name}
        fullWidth
        required={required}
        {...rest}
      />
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
