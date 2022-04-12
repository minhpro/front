import React from "react";
import * as Mui from "@mui/material";
import styled from "styled-components";
import { getImage } from "functions";
import { Link } from "react-router-dom";

export const LinkLms = ({ link, icon, name }) => {
  return (
    <Style.Wrapper>
      <Link to={link}>
        <Mui.Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          p={2}
          spacing={1}
          flexWrap={"wrap"}
        >
          <Mui.Avatar src={getImage.getSvg(icon)} variant="square" />
          <h4> {name}</h4>
        </Mui.Stack>
      </Link>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.div`
    display: block;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    :hover {
      background-color: #fcf0f1;
    }
  `,
};
