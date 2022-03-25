import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const ListUserGroup = () => {
  return (
    <Views.ViewContent title={"Quản lý user > Danh sách nhóm"}>
      <Mui.Stack spacing={3}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Tên nhóm"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.ExamType label={"Tên nhóm trưởng"} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Trạng thái"} />
            </Item>
          </Mui.Grid>

          <Mui.Stack pt={5} direction={"row"} spacing={3}>
            <Eui.EuiButton.Progress name={"Thêm mới"} />
            <Eui.EuiButton.Progress name={"Tìm kiếm"} />
          </Mui.Stack>
        </Views.ViewBoard>
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
    name: "Tên nhóm",
    width: 200,
  },
  {
    name: "Nhóm trưởng",
    width: 200,
  },
  {
    name: "Số lượng thành viên",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
