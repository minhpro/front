import * as Mui from "@mui/material";
import * as Co from "components";
import React from "react";

export const ViewAnswer = ({ suggest, answer }) => {
  var data = 0;

  switch (answer) {
    case 0:
      data = "A";
      break;
    case 1:
      data = "B";
      break;
    case 2:
      data = "C";
      break;
    case 3:
      data = "D";
      break;
    default:
      data = answer;
  }
  return (
    <Mui.Stack>
      <Co.Text.Body.Medium>Gợi ý:</Co.Text.Body.Medium>
      <Co.Text.Normal.Medium>
        <div dangerouslySetInnerHTML={{ __html: suggest }} />
      </Co.Text.Normal.Medium>

      <Co.Text.Body.Medium>Đáp án:</Co.Text.Body.Medium>
      <Co.Text.Normal.Medium>
        <div dangerouslySetInnerHTML={{ __html: data }} />
      </Co.Text.Normal.Medium>
    </Mui.Stack>
  );
};
