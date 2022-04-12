import React from "react";
import * as Mui from "@mui/material";
import { getImage } from "functions";
import styled from "styled-components";
import { AuthNav } from "components/Nav";
import { removeLocalToken } from "utils/token/removeLocalToken";
import { auth } from "utils/token/LocalStorage";

export const NavMenu = ({ name }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogOut = () => {
    removeLocalToken();
    auth.setLocalToken(null);
    window.location.reload();
  };

  return (
    <Style.Wrapper>
      <Mui.Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        onClick={handlePopoverOpen}
      >
        <Mui.Avatar src={getImage.getJpeg("testi-1")} />
        <h4> {name || "name"}</h4>
      </Mui.Stack>
      <Mui.Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Mui.Stack p={2}>
          <p>Xin chao nhat minh</p>

          <AuthNav onClick={handleLogOut} />
        </Mui.Stack>
      </Mui.Popover>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.div`
    position: relative;
    cursor: pointer;
  `,
};
