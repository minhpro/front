import { Stack } from "@mui/material";
import { EuiButton } from "components/Eui";
import React from "react";
import { Link } from "react-router-dom";

export const ButtonLogin = () => {
  return (
    <Link to={"/login"}>
      <Stack
        bgcolor={"primary.main"}
        px={2}
        py={1}
        borderRadius={5}
        sx={{
          cursor: "pointer",
          color: "white.main",
          ":hover": {
            transform: "translateY(-5px) scale(1.02)",
          },
        }}
      >
        <h3>Đăng nhập</h3>
      </Stack>
    </Link>
  );
};
