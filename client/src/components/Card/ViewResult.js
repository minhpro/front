import React from "react";
import * as Mui from "@mui/material";
import * as Co from "components";
import * as Sui from "components/Sui";
import { useDispatch } from "react-redux";
import styled from "styled-components";

export const ViewResult = () => {
  return <Mui.Stack>ViewQuestion</Mui.Stack>;
};

ViewResult.Constructed = function Constructed({
  index,
  code,
  question,
  exam,
  id,
  studentAnswer,
  ...rest
}) {
  return (
    <Mui.Stack direction={"column"}>
      <Co.Text.Body.Caption>
        Câu {index} - {code || "code"}:
      </Co.Text.Body.Caption>
      <Co.Text.Body.Medium>
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </Co.Text.Body.Medium>
      <Mui.Divider />
      <Co.Text.Normal.Medium>Tự luận</Co.Text.Normal.Medium>
      <Mui.Divider />
      <Co.Text.Normal.Medium>
        <div dangerouslySetInnerHTML={{ __html: studentAnswer }} />
      </Co.Text.Normal.Medium>
    </Mui.Stack>
  );
};

ViewResult.MultiChoice = function MultiChoice({
  index,
  code,
  question,
  A,
  B,
  C,
  D,
  id,
  studentAnswer,
  correctAnswer,
}) {
  function getResult(answer) {
    if (answer === correctAnswer) {
      return "green";
    } else {
      if (studentAnswer === answer) {
        return "red";
      } else return "var(--color-title)";
    }
  }

  function getResultString() {
    switch (studentAnswer) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
    }
  }
  return (
    <Mui.Stack direction={"column"}>
      <Co.Text.Body.Caption>
        Cau {index} - {code}:
      </Co.Text.Body.Caption>
      <Co.Text.Body.Medium>
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </Co.Text.Body.Medium>
      <Mui.Divider />
      <Co.Text.Normal.Medium>Đáp án đúng:</Co.Text.Normal.Medium>
      <Style.ColorAnswer
        direction={"row"}
        alignItems={"flex-end"}
        spacing={2}
        correctAnswer={getResult(0)}
      >
        <Co.Text.Body.Medium>A.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: A }} />
        </Co.Text.Normal.Medium>
      </Style.ColorAnswer>
      <Style.ColorAnswer
        direction={"row"}
        alignItems={"flex-start"}
        spacing={2}
        correctAnswer={getResult(1)}
      >
        <Co.Text.Body.Medium>B.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: B }} />
        </Co.Text.Normal.Medium>
      </Style.ColorAnswer>
      <Style.ColorAnswer
        direction={"row"}
        alignItems={"flex-end"}
        spacing={2}
        correctAnswer={getResult(2)}
      >
        <Co.Text.Body.Medium>C.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: C }} />
        </Co.Text.Normal.Medium>
      </Style.ColorAnswer>
      <Style.ColorAnswer
        direction={"row"}
        alignItems={"flex-end"}
        spacing={2}
        correctAnswer={getResult(3)}
      >
        <Co.Text.Body.Medium>D.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: D }} />
        </Co.Text.Normal.Medium>
      </Style.ColorAnswer>
      <Mui.Divider />
      <Co.Text.Normal.Medium>
        Trả lời: {getResultString()}
      </Co.Text.Normal.Medium>

      <Mui.Divider />
    </Mui.Stack>
  );
};

const Style = {
  ColorAnswer: styled(Mui.Stack)`
    color: ${(props) => props.correctAnswer};
  `,
};
