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

ExModalPoppup.Create = function Create({ open, handleClose, handleCreate }) {
  return (
    <Eui.EuiModal.Title
      open={open}
      handleClose={handleClose}
      w={"80%"}
      mw={300}
      title={"Xác nhận Tạo mới?"}
    >
      <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
        <Eui.EuiButton.Cancel onClick={handleClose} />
        <Eui.EuiButton.Progress name={"Tạo mới"} onClick={handleCreate} />
      </Mui.Stack>
    </Eui.EuiModal.Title>
  );
};
