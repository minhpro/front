import React from "react";
import styled from "styled-components";
import * as Func from "functions";
import * as Mui from "@mui/material";
import * as Sui from "components/Sui";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Style.Wrapper className="container">
      <Mui.Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        py={2}
      >
        <Link to={"/"}>
          <Sui.SuiLogo.Basic src={Func.getImage.getPng("logo")} />
        </Link>

        <p>nav</p>
      </Mui.Stack>

      <Mui.Stack sx={{ height: "100%" }} justifyContent={"center"} py={10}>
        <h1>Khảo thí</h1>
      </Mui.Stack>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.header`
    background-image: url(${Func.getImage.getPng("header1")});
    min-height: 230px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;

    h1 {
      color: white;
    }
  `,
};
