import React from "react";
import * as Mui from "@mui/material";
import { navComcomPage } from "assets/contants";
import { NavSystemPage } from "components/Nav";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";

export const Nav = () => {
  const nav = useSelector((s) => s.reduxNavSystem);
  const dispatch = useDispatch();

  // function

  function handlerNav(i) {
    dispatch(Slide.navComcomSystemSlide.setNav(i));
  }

  return (
    <Mui.Stack
      direction={"row"}
      justifyContent={"flex-start"}
      flexWrap={"wrap"}
    >
      {navComcomPage.map((item, i) => {
        return (
          <NavSystemPage
            onClick={() => handlerNav(i)}
            name={item.name}
            choose={nav === i}
            key={i}
          />
        );
      })}
    </Mui.Stack>
  );
};
