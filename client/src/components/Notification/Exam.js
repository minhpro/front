import React from "react";
import * as Mui from "@mui/material";
import * as Co from "components";
import { EuiButton } from "components/Eui";
import { Link } from "react-router-dom";

export const Exam = ({ open, handleClose, severity, id }) => {
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
        <Mui.Stack spacing={2}>
          <Co.Text.Body.Medium>Bạn có bài thi sắp diễn ra</Co.Text.Body.Medium>
          <Co.Text.Body.Medium>
            <Link to={`lam-bai/${id}`}>
              <EuiButton.AddType name={"Vào làm bài thi"} />
            </Link>
          </Co.Text.Body.Medium>
        </Mui.Stack>
      </Mui.Alert>
    </Mui.Snackbar>
  );
};
