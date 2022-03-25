import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const ListUser = () => {
  return (
    <Views.ViewContent title={"Quản lý user > Danh sách User"}>
      <Mui.Stack spacing={3}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Item>
              <Ex.ExInputWrapper.Basic label={"ID người dùng "} />
            </Item>
            <Item>
              <Ex.ExDataSelect.ExamType label={"Tên người dùng"} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Vai trò"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Class label={"Nhóm"} />
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
    <Mui.Grid item xs={12} md={6}>
      {children}
    </Mui.Grid>
  );
};

const dataColumn = [
  {
    name: "ID",
    width: 50,
  },
  {
    name: "Họ tên",
    width: 200,
  },
  {
    name: "Số điện thoại",
    width: 200,
  },
  {
    name: "Email",
    width: 200,
  },
  {
    name: "Vai trò",
    width: 200,
  },
  {
    name: "Nhóm",
    width: 200,
  },
  {
    name: "Ngày tạo",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
