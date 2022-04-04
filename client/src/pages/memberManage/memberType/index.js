import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const MemberType = () => {
  return (
    <Views.ViewContent title={"Quản lý thành viên > Loại thành viên"}>
      <Mui.Stack spacing={2}>
        {/* button */}
        <Views.ViewBoard>
          <Mui.Stack direction={"row"} spacing={3}>
            <Eui.EuiButton.AddType name={"Thêm loại thành viên mới"} />
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
