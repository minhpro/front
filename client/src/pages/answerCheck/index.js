import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const AnswerCheck = () => {
  return (
    <Views.ViewContent title={"Xem đáp án"}>
      <Mui.Stack spacing={3}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Đề thi đã khởi tạo"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.ExamType label={"Dạng đề thi"} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Hình thức thi"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Class label={"Chọn lớp"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Subject label={"Chọn môn"} />
            </Item>
          </Mui.Grid>

          <Mui.Stack pt={5}>
            <Eui.EuiButton.Progress name={"Tim kiem"} />
          </Mui.Stack>
        </Views.ViewBoard>

        {/* bang du lieu */}
        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}></Eui.EuiTable>
        </Views.ViewBoard>
      </Mui.Stack>
    </Views.ViewContent>
  );
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} md={6} lg={4}>
      {children}
    </Mui.Grid>
  );
};

const dataColumn = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Tên bộ đề",
    width: 200,
  },
  {
    name: "Số câu hỏi",
    width: 200,
  },
  {
    name: "Hình thức thi",
    width: 200,
  },
  {
    name: "Số thí sinh",
    width: 200,
  },
  {
    name: "Thời gian",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
