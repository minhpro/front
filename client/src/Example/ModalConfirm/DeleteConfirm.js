import React from "react";
import * as Sui from "components";
import * as Contants from "assets/contants";
import { Stack } from "@mui/material";

export const DeleteConfirm = ({ onClose, onFunc, ...rest }) => {
  return (
    <Sui.Modal.BasicModal.Title
      title={Contants.titleData.Basic.ConfirmDelete}
      handleClose={onClose}
      w={300}
      {...rest}
    >
      <Stack direction={"row"} justifyContent={"center"} spacing={5} pt={5}>
        <Sui.Button.Basic.Cancel onClick={onClose} />
        <Sui.Button.Basic.Delete onClick={onFunc} />
      </Stack>
    </Sui.Modal.BasicModal.Title>
  );
};
