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
import { authContants } from "assets/contants";
import * as LocalStorage from "utils/token/LocalStorage";

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

  React.useEffect(() => {
    console.log(LocalStorage.auth.getLocalToken());
    if (LocalStorage.auth.getLocalToken()) {
      dispatch(
        Slide.authSlide.setAuth({
          username: LocalStorage.auth.getLocalToken().role,
          roles: [LocalStorage.auth.getLocalToken().role],
        })
      );
      console.log("navigate to khao thi")
      return navigate("/khao-thi/cau-hinh-chung", { replace: true });
    } else return;
  }, [from, navigate, dispatch]);

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

        window.localStorage.setItem("token", res.access_token);
        window.localStorage.setItem("refreshToken", res.refresh_token);
        LocalStorage.auth.setLocalToken(res.user);
        dispatch(
          Slide.authSlide.setAuth({
            username: res.role,
            roles: [res.role],
          })
        );
        console.log(res);
        console.log("navigate to khao thi")
        navigate("/khao-thi/cau-hinh-chung", { replace: true });
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
      <h3>Đăng nhập hệ thống EBD</h3>
      <Eui.EuiInput.Icon
        placeholder={"Nhập địa chỉ email"}
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
        type={authInput.showPassword ? "text" : "password"}
        placeholder={"Nhập mật khẩu"}
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
      <Mui.Stack direction={"row"} justifyContent={"space-between"}>
        <Eui.EuiButton.Progress name={"Đăng nhập"} component={"button"} />
        <h3>Quên mật khẩu?</h3>
      </Mui.Stack>

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
