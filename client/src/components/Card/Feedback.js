import { Avatar, Stack } from "@mui/material";
import { getImage } from "functions";
import React from "react";

export const Feedback = ({ name, type, feed, img }) => {
  return (
    <Stack
      border={"solid 1px"}
      width={"100%"}
      borderRadius={5}
      p={2}
      spacing={2}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        <Avatar src={getImage.getJpeg(img)} sx={{ width: 72, height: 72 }} />
        <Stack>
          <h3> {name}</h3>
          <p> {type}</p>
        </Stack>
      </Stack>
      <Stack>
        <p>{feed}</p>
        <img src={getImage.getSvg("quote-right-3")} style={{ width: "60px" }} />
      </Stack>
    </Stack>
  );
};
