import * as Mui from "@mui/material";
import { EuiButton } from "components/Eui";
import { ExInputWrapper } from "Example";
import React from "react";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";

import * as Eui from "components/Eui";
import * as Ex from "Example";

import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
import * as Co from "components";
import { SecondFormat } from "utils/timeFormat/secondFormat";
export const TypeSent = () => {
  // redux
  const reduxOtherConfig = useSelector((state) => state.reduxOtherConfig);

  const [data, setData] = React.useState("");
  const [timeDisplay, settimeDisplay] = React.useState("");
  const dispatch = useDispatch();

  const [deleteState, setDeleteState] = React.useState({
    id: null,
    open: false,
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  function save() {
    Function.handler
      .api(() => Api.otherConfigApi.updateDuration(data))
      .then((res) => {
        console.log(res);
        setSnack({
          isOpen: true,
          message: "Update Cấu hình mới",
          severity: null,
        });
      })
      .catch((error) => console.log(error));

    handleCloseModal();
    console.log("submit");
  }

  const handleCloseSnack = () => {
    setSnack({ ...snack, isOpen: false });
  };
  function get() {
    Function.handler
      .api(() => Api.otherConfigApi.all())
      .then((res) => {
        console.log(res);
        dispatch(Slide.OtherConfigSlide.setOtherConfig(res));
        const time = new SecondFormat(res.testingDuration);

        settimeDisplay(time.getString());
      })
      .catch((error) => console.log(error));
  }

  function handleOpenModal() {
    setDeleteState({ id: null, open: true });
  }

  function handleCloseModal() {
    setDeleteState({ id: null, open: false });
  }

  function handleSetTime(time) {
    console.log(time);
    setData(time);
  }

  React.useEffect(() => {
    get();
  }, [snack]);
  return (
    <div>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={handleCloseSnack}
        message={snack.message}
        severity={snack.severity}
      />

      {/* modal delete */}
      <Eui.EuiModal.Title
        open={deleteState.open}
        handleClose={handleCloseModal}
        w={"80%"}
        mw={300}
        title={"Lưu cấu hình mới?"}
      >
        <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
          <Eui.EuiButton.Cancel onClick={handleCloseModal} />
          <Eui.EuiButton.AddType name={"Lưu cấu hình"} onClick={save} />
        </Mui.Stack>
      </Eui.EuiModal.Title>

      {/* content */}

      <p>Thời gian hệ thống gửi link trước thời gian bắt đầu thi/ kiểm tra: </p>
      <p> {timeDisplay}</p>

      <p>Chỉnh sửa: </p>
      <Mui.Stack width={{ xs: "90%", sm: "70%", md: "40%", lg: "40%" }}>
        <Co.Time.TimeWrapper setTime={handleSetTime} />
      </Mui.Stack>
      <Mui.Stack direction={"row"} py={3} spacing={3}>
        <EuiButton.Cancel />
        <EuiButton.AddNew name={"Lưu cấu hình"} onClick={handleOpenModal} />
      </Mui.Stack>
    </div>
  );
};
