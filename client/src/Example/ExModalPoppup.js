import * as Mui from "@mui/material";
import * as Eui from "components/Eui";

import React from "react";

export const ExModalPoppup = () => {
  return <div>ExModalPoppup</div>;
};

ExModalPoppup.Delete = function Delete({ open, handleClose, handleDelete }) {
  return (
    <Eui.EuiModal.Title
      open={open}
      handleClose={handleClose}
      w={"80%"}
      mw={300}
      title={"Xác nhận xoá?"}
    >
      <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
        <Eui.EuiButton.Cancel onClick={handleClose} />
        <Eui.EuiButton.Progress name={"Xoá"} onClick={handleDelete} />
      </Mui.Stack>
    </Eui.EuiModal.Title>
  );
};

ExModalPoppup.Basic = function Basic({
  title,
  open,
  name,
  handleClose,
  handleFunc,
}) {
  return (
    <Eui.EuiModal.Title
      open={open}
      handleClose={handleClose}
      w={"80%"}
      mw={"100%"}
      title={title || "Xác nhận tạo mới?"}
    >
      <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
        <Eui.EuiButton.Cancel onClick={handleClose} />
        <Eui.EuiButton.AddNew name={name || "Tạo mới"} onClick={handleFunc} />
      </Mui.Stack>
    </Eui.EuiModal.Title>
  );
};

ExModalPoppup.Create = function Create({
  open,
  handleClose,
  handleCreate,
  children,
}) {
  return (
    <Eui.EuiModal.Title
      open={open}
      handleClose={handleClose}
      w={"80%"}
      mw={700}
      title={"Xác nhận Tạo mới?"}
    >
      <Mui.Stack
        direction={"column"}
        spacing={1.5}
        component={"form"}
        onSubmit={handleCreate}
        sx={{ maxHeight: "70vh", overflowY: "scroll" }}
      >
        {children}

        <Mui.Stack
          direction={"row"}
          justifyContent={"center"}
          pt={5}
          spacing={4}
        >
          <Eui.EuiButton.Cancel onClick={handleClose} />

          <Eui.EuiButton.AddNew name={"Tạo mới"} component={"button"} />
        </Mui.Stack>
      </Mui.Stack>
    </Eui.EuiModal.Title>
  );
};

ExModalPoppup.ViewQuestion = function ViewQuestion({
  open,
  handleClose,
  handleDelete,
  title,
  children,
}) {
  return (
    <Eui.EuiModal.Title
      open={open}
      handleClose={handleClose}
      w={"80%"}
      mw={600}
      title={title || "Xem câu hỏi"}
    >
      <Mui.Stack direction={"column"} spacing={1.5}>
        {children}
      </Mui.Stack>
      <Mui.Stack direction={"row"} justifyContent={"center"} pt={5} spacing={5}>
        <Eui.EuiButton.Cancel onClick={handleClose} />
        <Eui.EuiButton.Delete name={"Xoá"} onClick={handleDelete} />
      </Mui.Stack>
    </Eui.EuiModal.Title>
  );
};
