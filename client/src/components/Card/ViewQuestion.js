import React from "react";
import * as Mui from "@mui/material";
import * as Co from "components";
import * as Sui from "components/Sui";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
export const ViewQuestion = () => {
  return <Mui.Stack>ViewQuestion</Mui.Stack>;
};

ViewQuestion.Constructed = function Constructed({
  index,
  code,
  question,
  exam,
  id,
  ...rest
}) {
  const dispatch = useDispatch();
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
      {exam ? (
        <Sui.SuiRichTextEditor
          placeholder="Nhập đáp án tại đây..."
          onChange={(e) =>
            dispatch(
              Slide.checkingSlice.request({
                type: "constructedResponseQuestions",
                id: id,
                answer: e,
              })
            )
          }
        />
      ) : null}
    </Mui.Stack>
  );
};

ViewQuestion.MultiChoice = function MultiChoice({
  index,
  code,
  question,
  A,
  B,
  C,
  D,
  id,
  exam,
}) {
  const dispatch = useDispatch();
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
      <Mui.Stack my={2}>
        {exam ? (
          <Mui.FormControl>
            <Mui.FormLabel sx={{ paddingBottom: 2 }}>
              <Co.Text.Body.Medium>Chọn đáp án</Co.Text.Body.Medium>
            </Mui.FormLabel>
            <Mui.RadioGroup
              row
              onChange={(e) =>
                dispatch(
                  Slide.checkingSlice.request({
                    type: "multiChoiceQuestions",
                    id: id,
                    answer: parseInt(e.target.value),
                  })
                )
              }
            >
              <Mui.FormControlLabel
                value={0}
                control={<Mui.Radio />}
                label="A"
              />
              <Mui.FormControlLabel
                value={1}
                control={<Mui.Radio />}
                label="B"
              />
              <Mui.FormControlLabel
                value={2}
                control={<Mui.Radio />}
                label="C"
              />
              <Mui.FormControlLabel
                value={3}
                control={<Mui.Radio />}
                label="D"
              />
            </Mui.RadioGroup>
          </Mui.FormControl>
        ) : null}
      </Mui.Stack>

      <Mui.Divider />
    </Mui.Stack>
  );
};
