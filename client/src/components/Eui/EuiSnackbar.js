import React from "react";
import * as Mui from "@mui/material";

export const EuiSnackbar = ({ open, handleClose, message, severity }) => {
  return (
    <Mui.Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Mui.Alert
        onClose={handleClose}
        severity={severity || "success"}
        sx={{ width: "100%" }}
      >
        <h3> {message || "   This is a success message!"}</h3>
      </Mui.Alert>
    </Mui.Snackbar>
  );
};
