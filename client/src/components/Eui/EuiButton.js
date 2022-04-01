import * as Mui from "@mui/material";
import React from "react";
import { AddCircleOutline, Search, Create, Add } from "@mui/icons-material";

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
      sx={{
        cursor: "pointer",
        ":hover": { transform: "translateY(-3px) scale(1.02)" },
      }}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
      {...rest}
    >
      <AddCircleOutline sx={{ fontSize: 20 }} />
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

EuiButton.Search = function ({ name, ...rest }) {
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
      sx={{
        cursor: "pointer",
        ":hover": { transform: "translateY(-3px) scale(1.02)" },
      }}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
      {...rest}
    >
      <Search sx={{ fontSize: 20 }} />
      <p>{name || "Tìm kiếm"}</p>
    </Mui.Stack>
  );
};

EuiButton.OpenCreate = function ({ name, ...rest }) {
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
      sx={{
        cursor: "pointer",
        ":hover": { transform: "translateY(-3px) scale(1.02)" },
        backgroundColor: "#dc1928",
        ":hover": {
          backgroundColor: "#f43d41",
          transform: "translateY(-3px) scale(1.02)",
        },
      }}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
      {...rest}
    >
      <Create sx={{ fontSize: 20 }} />
      <p>{name || "Tạo mới"}</p>
    </Mui.Stack>
  );
};

EuiButton.AddNew = function ({ name, ...rest }) {
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
      sx={{
        cursor: "pointer",
        ":hover": { transform: "translateY(-3px) scale(1.02)" },
        backgroundColor: "#dc1928",
        ":hover": {
          backgroundColor: "#f43d41",
          transform: "translateY(-3px) scale(1.02)",
        },
      }}
      boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
      {...rest}
    >
      <Add sx={{ fontSize: 20 }} />
      <p>{name || "Tạo mới"}</p>
    </Mui.Stack>
  );
};
