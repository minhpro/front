import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Function from "functions";
import * as Api from "api";
import { useDispatch } from "react-redux";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Key,
} from "@mui/icons-material";
import * as Class from "Class";
export const LoginPage = () => {
  const [authInput, setAuthInput] = React.useState({
    username: "",
    password: "",
    showPassword: false,
  });
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đăng nhập thành công ",
    "Đã xoá dạng đề thi, id: ",
    "Tên đăng nhập và mật khẩu chưa chính xác"
  );

  class Func {
    handleChange(e) {
      setAuthInput({ ...authInput, [e.target.name]: e.target.value });
    }
    login(e) {
      e.preventDefault();

      Function.handler
        .api(() => Api.authApi.login(authInput.username, authInput.password))
        .then((res) => {
          if (res?.response?.status == 400) {
            console.log(res?.response?.status);
            handleSnack.error(res.response.data.message);
          } else {
            handleSnack.add("");
          }
          console.log("login success")
          console.log(res);
        })
        .catch((error) =>{
            console.log("login error")
            handleSnack.error("")
        });
      console.log("login");
    }
  }
  const func = new Func();
  return (
    <Mui.Stack
      width={{ xs: "90%", md: "80%", lg: "50%" }}
      spacing={2}
      component={"form"}
      onSubmit={func.login}
    >
      <h2>Đăng nhập hệ thống EBD</h2>
      <Eui.EuiInput.Icon
        name="username"
        label="username"
        type="text"
        InputProps={{
          startAdornment: (
            <Mui.InputAdornment position="start">
              <AccountCircle />
            </Mui.InputAdornment>
          ),
        }}
        onChange={func.handleChange}
        // error={true}
        // error={usernameErr}
      />
      <Eui.EuiInput.Icon
        name="password"
        label="password"
        type="password"
        InputProps={{
          startAdornment: (
            <Mui.InputAdornment position="start">
              <Key />
            </Mui.InputAdornment>
          ),
          endAdornment: (
            <Mui.InputAdornment
              position="end"
              onClick={() =>
                setAuthInput({
                  ...authInput,
                  showPassword: !authInput.showPassword,
                })
              }
              sx={{ cursor: "pointer" }}
            >
              {authInput.showPassword ? <VisibilityOff /> : <Visibility />}
            </Mui.InputAdornment>
          ),
        }}
        onChange={func.handleChange}
        // error={true}
        // error={usernameErr}
      />
      <Eui.EuiButton.Progress name={"Đăng nhập"} component={"button"} />
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
    </Mui.Stack>
  );
};
