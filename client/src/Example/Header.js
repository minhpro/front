import React from "react";
import styled from "styled-components";
import * as Func from "functions";
import * as Mui from "@mui/material";
import * as Sui from "components/Sui";
import { Link } from "react-router-dom";
import * as Hook from "hook";
import * as Contants from "assets/contants";
import * as Co from "components";

export const Header = () => {
  return (
    <Style.Wrapper>
      <Mui.Stack
        sx={{ height: "100%" }}
        justifyContent={"center"}
        my={10}
        className="container"
      >
        <h1>Khảo thí</h1>
      </Mui.Stack>
    </Style.Wrapper>
  );
};

Header.Nav = function Nav({ c }) {
  const scrollPosition = Hook.useScrollPostion();
  return (
    <Style.Nav c={scrollPosition > 200}>
      <Mui.Stack
        direction={"row"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
        className="container"
        sx={{ minHeight: 70 }}
      >
        <Mui.Stack
          alignItems={"center"}
          direction={"row"}
          height={"100%"}
          sx={{ transform: "translateY(-10px)" }}
        >
          <Link to={"/"}>
            <Sui.SuiLogo.Basic src={Func.getImage.getPng("logo")} />
          </Link>
        </Mui.Stack>
        <Mui.Stack
          direction={"row"}
          spacing={2}
          sx={{ display: { xs: "none", md: "flex" } }}
          alignItems={"center"}
        >
          {Contants.navData.header.map((item, i) => {
            return (
              <Style.NavLink to={item.link} key={i} className={"ad"}>
                <h3 style={{ color: `${c || "width"}` }}>{item.name}</h3>
              </Style.NavLink>
            );
          })}
          <Co.Auth.AuthHeader />
        </Mui.Stack>
      </Mui.Stack>
    </Style.Nav>
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

  Nav: styled.div`
    display: block;
    position: fixed;
    top: 0;
    width: 100%;
    background: ${(props) => (props.c ? "#91959F" : "none")};
    z-index: 10;
    box-shadow: 0px -3px 21px rgba(0, 0, 0, 0.25);
    color: white;
  `,

  NavLink: styled(Link)`
    display: inline-block;
    position: relative;
    color: white;
    cursor: pointer;

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: white;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }

    :hover {
      ::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  `,
};
