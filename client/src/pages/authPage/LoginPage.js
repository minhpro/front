import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Function from "functions";
import * as Api from "api";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Key,
} from "@mui/icons-material";
import * as Class from "Class";
export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const dispatch = useDispatch();
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
    async login(e) {
      e.preventDefault();

      try {
        const res = await Api.authApi.login(
          authInput.username,
          authInput.password
        );
        handleSnack.add("");
        dispatch(
          Slide.authSlide.setAuth({
            username: "admin",
            roles: ["ADMIN"],
          })
        );
        console.log(res);
        navigate(from, { replace: true });
      } catch (error) {
        handleSnack.error("");
      }
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
