import styled from "styled-components";
import * as Mui from "@mui/material";

import { EuiInput, EuiMultiSelect } from "components/Eui";
import React from "react";
import { SuiRichTextEditor } from "components/Sui";

export const ExInputWrapper = () => {
  return <div>ExInputWrapper</div>;
};

ExInputWrapper.Select = function ({ label, name, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
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

ExInputWrapper.Basic = function ({ name, label, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
      </Style.Label>
      <EuiInput id={name} name={name} fullWidth required={required} {...rest} />
    </Mui.Stack>
  );
};

ExInputWrapper.Multiline = function ({ name, label, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
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

ExInputWrapper.Editor = function ({ name, label, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
      </Style.Label>
      <SuiRichTextEditor name={name} {...rest} />
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

ExInputWrapper.MultiSelect = function ({ name, label, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {label} <span> {required ? "*" : null}</span>
      </Style.Label>
      <EuiMultiSelect {...rest} />
    </Mui.Stack>
  );
};

ExInputWrapper.Time = function ({ name, label, required, ...rest }) {
  return (
    <Mui.Stack spacing={0.5}>
      <Style.Label for={name}>
        {label || "Giây"} <span> {required ? "*" : null}</span>
      </Style.Label>
      <EuiInput
        type={"number"}
        id={name}
        name={name}
        fullWidth
        required={required}
        {...rest}
      />
    </Mui.Stack>
  );
};
