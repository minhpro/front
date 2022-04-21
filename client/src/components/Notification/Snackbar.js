import React from "react";
import * as Mui from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";

export const Snackbar = ({ open, handleClose, message, severity }) => {
  const dispatch = useDispatch();
  const snack = useSelector((s) => s.reduxSnackbar);
  return (
    <Mui.Snackbar
      open={snack.isOpen}
      autoHideDuration={6000}
      onClose={() => dispatch(Slide.snackbarSlide.close())}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Mui.Alert
        onClose={() => dispatch(Slide.snackbarSlide.close())}
        severity={snack.severity || "success"}
        sx={{ width: "100%" }}
      >
        <h3> {snack.message || " "}</h3>
      </Mui.Alert>
    </Mui.Snackbar>
  );
};
