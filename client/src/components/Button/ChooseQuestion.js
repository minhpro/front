import * as Mui from "@mui/material";
import * as Co from "components";
import React from "react";
import styled from "styled-components";

export const ChooseQuestion = ({ i, onClick, done, ...rest }) => {
  // funcion
  function handleChange() {
    if (done) {
      return null;
    } else {
      onClick(i);
    }
  }

  return (
    <Style.Wrapper onClick={handleChange} done={done} {...rest}>
      <Mui.Stack justifyContent={"center"} alignItems={"center"}>
        <Co.Text.Normal.Medium>Câu {i + 1}</Co.Text.Normal.Medium>
      </Mui.Stack>
    </Style.Wrapper>
  );
};

ChooseQuestion.Wrapper = function ({ children }) {
  return (
    <Mui.Stack
      direction={"row"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      flexWrap={"wrap"}
      gap={1}
      mt={2}
    >
      {children}
    </Mui.Stack>
  );
};

const Style = {
  Wrapper: styled.div`
    background-color: ${(props) => pickColor(props.choose, props.done)};
    border-radius: 10px;
    flex: 1 1 80px;
    max-width: 80px;
    cursor: pointer;
    transform: ${(props) =>
      props.choose ? "translateY(-3px) scale(1.02)" : null};
  `,
};

function pickColor(choose, done) {
  if (choose) {
    return "green";
  } else {
    if (done) {
      return "red";
    } else return "grey";
  }
}
