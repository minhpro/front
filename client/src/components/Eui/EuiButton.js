import * as Mui from "@mui/material";
import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export const EuiButton = () => {
  return <div>ExButton</div>;
};

EuiButton.AddType = function ({ name, ...rest }) {
  return (
    <Mui.Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent="flex-start"
      spacing={2}
      bgcolor={"#7e8299"}
      width={"fit-content"}
      px={2}
      py={1}
      borderRadius={2}
      sx={{ cursor: "pointer" }}
      {...rest}
    >
      <AddCircleOutlineIcon sx={{ fontSize: 20 }} />
      <p>{name || "name"}</p>
    </Mui.Stack>
  );
};

EuiButton.Cancel = function ({ ...rest }) {
  return (
    <Mui.Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent="center"
      color={"#7e8299"}
      width={"fit-content"}
      py={0.5}
      px={1}
      borderRadius={2}
      sx={{
        backgroundColor: "#f5f8fa",
        ":hover": { backgroundColor: "#f7f9fb" },
        cursor: "pointer",
        minWidth: 100,
      }}
      {...rest}
    >
      Huỷ
    </Mui.Stack>
  );
};

EuiButton.Progress = function ({ name, ...rest }) {
  return (
    <Mui.Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent="center"
      color={"white.main"}
      width={"fit-content"}
      py={0.5}
      px={1}
      borderRadius={2}
      sx={{
        backgroundColor: "#dc1928",
        ":hover": { backgroundColor: "#f43d41" },
        cursor: "pointer",
        minWidth: 100,
      }}
      {...rest}
    >
      {name || "name"}
    </Mui.Stack>
  );
};
