import React from "react";
import * as Mui from "@mui/material";
import * as Co from "components";

export const ViewQuestion = () => {
  return <Mui.Stack>ViewQuestion</Mui.Stack>;
};

ViewQuestion.Constructed = function ({ index, code, question }) {
  return (
    <Mui.Stack direction={"column"}>
      <Co.Text.Body.Caption>
        Cau {index} - {code}:
      </Co.Text.Body.Caption>
      <Co.Text.Body.Medium>
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </Co.Text.Body.Medium>
      <Mui.Divider />
      <Co.Text.Normal.Medium>Tự luận</Co.Text.Normal.Medium>
      <Mui.Divider />
    </Mui.Stack>
  );
};

ViewQuestion.MultiChoice = function ({ index, code, question, A, B, C, D }) {
  return (
    <Mui.Stack direction={"column"}>
      <Co.Text.Body.Caption>
        Cau {index} - {code}:
      </Co.Text.Body.Caption>
      <Co.Text.Body.Medium>
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </Co.Text.Body.Medium>
      <Mui.Divider />
      <Co.Text.Normal.Medium>Chon dap an</Co.Text.Normal.Medium>
      <Mui.Stack direction={"row"} alignItems={"flex-end"} spacing={2}>
        <Co.Text.Body.Medium>A.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: A }} />
        </Co.Text.Normal.Medium>
      </Mui.Stack>
      <Mui.Stack direction={"row"} alignItems={"flex-start"} spacing={2}>
        <Co.Text.Body.Medium>B.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: B }} />
        </Co.Text.Normal.Medium>
      </Mui.Stack>
      <Mui.Stack direction={"row"} alignItems={"flex-end"} spacing={2}>
        <Co.Text.Body.Medium>C.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: C }} />
        </Co.Text.Normal.Medium>
      </Mui.Stack>
      <Mui.Stack direction={"row"} alignItems={"flex-end"} spacing={2}>
        <Co.Text.Body.Medium>D.</Co.Text.Body.Medium>
        <Co.Text.Normal.Medium>
          <div dangerouslySetInnerHTML={{ __html: D }} />
        </Co.Text.Normal.Medium>
      </Mui.Stack>

      <Mui.Divider />
    </Mui.Stack>
  );
};
