import * as Mui from "@mui/material";
import { getImage } from "functions";
import React from "react";

export const Feature = ({ img, title, text }) => {
  return (
    <Mui.Stack
      p={2}
      alignItems={"center"}
      spacing={2}
      sx={{
        textAlign: "center",
        boxShadow: "0px 30px 40px 0px rgb(1 11 60 / 10%)",
        borderRadius: "0 30px 40px 0px",
      }}
    >
      <Mui.Avatar
        variant="square"
        sx={{
          width: 72,
          height: 72,
          ":hover": { transform: "translateY(-5px)" },
        }}
        src={getImage.getPng(img)}
      />
      <h3>{title}</h3>
      <p>{text}</p>
    </Mui.Stack>
  );
};
