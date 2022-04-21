import React from "react";
import * as Mui from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { titleData } from "assets/contants";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";

export const Basic = ({ name, c, ct, children, ...rest }) => {
  return (
    <Mui.Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent="flex-start"
      spacing={1}
      bgcolor={c || "#7e8299"}
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
      {children}

      <h4 style={{ color: ct }}>{name || "name"}</h4>
    </Mui.Stack>
  );
};

Basic.Delete = function ({ ...rest }) {
  return (
    <Basic
      name={titleData.Basic.Delete}
      {...rest}
      c={"primary.main"}
      ct={"white"}
    >
      <DeleteIcon sx={{ fontSize: 26, color: "white.main" }} />
    </Basic>
  );
};

Basic.Cancel = function ({ ...rest }) {
  return (
    <Basic c={"grey.300"} name={titleData.Basic.Cancel} {...rest}>
      <CancelIcon sx={{ fontSize: 26 }} />
    </Basic>
  );
};

Basic.Create = function ({ ...rest }) {
  return (
    <Basic name={titleData.Basic.Add} {...rest} c={"primary.main"} ct={"white"}>
      <LibraryAddIcon sx={{ fontSize: 26, color: "white.main" }} />
    </Basic>
  );
};

Basic.Update = function ({ ...rest }) {
  return (
    <Basic
      name={titleData.Basic.Update}
      {...rest}
      c={"primary.main"}
      ct={"white"}
    >
      <SystemUpdateAltIcon sx={{ fontSize: 26, color: "white.main" }} />
    </Basic>
  );
};
