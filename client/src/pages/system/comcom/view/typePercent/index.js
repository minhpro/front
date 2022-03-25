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
export const TypePercent = () => {
  // redux
  const reduxOtherConfig = useSelector((state) => state.reduxOtherConfig);

  const [data, setData] = React.useState("");
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
    if (data < 100) {
      Function.handler
        .api(() => Api.otherConfigApi.updateRate(data))
        .then((res) => {
          console.log(res);
          setSnack({
            isOpen: true,
            message: "Update Cấu hình mới",
            severity: null,
          });
        })
        .catch((error) => console.log(error));
    } else
      setSnack({
        isOpen: true,
        message: "Phần trăm câu trùng từ 1 - 99",
        severity: "warning",
      });
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
      })
      .catch((error) => console.log(error));
  }

  function handleOpenModal() {
    setDeleteState({ id: null, open: true });
  }

  function handleCloseModal() {
    setDeleteState({ id: null, open: false });
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
          <Eui.EuiButton.Progress name={"Lưu cấu hình"} onClick={save} />
        </Mui.Stack>
      </Eui.EuiModal.Title>
      <ExInputWrapper.Basic
        label={"Số % câu hỏi trùng khi hệ thống bốc đề Kiểm tra/ Thi"}
        name={"persent"}
        placeholder={reduxOtherConfig?.questionDuplicationRate}
        onChange={(e) => setData(parseInt(e.target.value))}
        type={"number"}
      />
      <Mui.Stack direction={"row"} py={3} spacing={3}>
        <EuiButton.Progress name={"Lưu cấu hình"} onClick={handleOpenModal} />
      </Mui.Stack>
    </div>
  );
};
