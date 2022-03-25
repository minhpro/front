import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const UserProfile = () => {
  return (
    <Views.ViewContent title={"Quản lý user > Hồ sơ người dùng"}>
      <Mui.Stack spacing={3}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Mui.Grid item xs={12}>
              <Ex.ExInputWrapper.Basic label={"ID người dùng"} />
            </Mui.Grid>
            <Item>
              <Ex.ExDataSelect.ExamType label={"Tên người dùng"} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Ngày sinh"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Class label={"Số điện thoại"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Subject label={"Email"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Class label={"Vai trò"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Subject label={"Nhóm"} />
            </Item>
          </Mui.Grid>
        </Views.ViewBoard>
        <Views.ViewBoard>
          <h2>Đôi mật khẩu</h2>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Mui.Grid item xs={12}>
              <Ex.ExInputWrapper.Basic label={"Mật khẩu cũ"} />
            </Mui.Grid>
            <Item>
              <Ex.ExDataSelect.ExamType label={"Mật khẩu mới"} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Xác nhận mật khẩu"} />
            </Item>
          </Mui.Grid>
        </Views.ViewBoard>
        <Views.ViewBoard>
          <Mui.Stack direction={"row"} spacing={2}>
            <Eui.EuiButton.Cancel />
            <Eui.EuiButton.Progress name={"Lưu lại"} />
          </Mui.Stack>
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
