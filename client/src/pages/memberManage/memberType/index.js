import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const MemberType = () => {
  return (
    <Views.ViewContent title={"Quản lý member > Loại thành viên"}>
      <Mui.Stack spacing={3}>
        {/* bang du lieu */}
        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}></Eui.EuiTable>
        </Views.ViewBoard>

        {/* button */}
        <Views.ViewBoard>
          <Mui.Stack pt={5} direction={"row"} spacing={3}>
            <Eui.EuiButton.Progress name={"Thêm mới"} />
            <Eui.EuiButton.Progress name={"Tìm kiếm"} />
          </Mui.Stack>
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
    name: "Loại thành viên",
    width: 200,
  },
  {
    name: "Mô tả",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
