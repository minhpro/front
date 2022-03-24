import * as Mui from "@mui/material";
import React from "react";
import { GrSystem } from "react-icons/gr";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const EuiNavMenu = ({ data }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Mui.Stack>
      <EuiNavMenu.Parent
        onClick={handleClick}
        open={open}
        name={data.name || "name"}
      />
      <Mui.Collapse in={open} timeout="auto" unmountOnExit>
        <Mui.Stack spacing={1}>
          {data.nav.map((nav, i) => {
            return (
              <Link key={i} to={nav.link || "/"}>
                <EuiNavMenu.Chil linkName={nav.name} />
              </Link>
            );
          })}
        </Mui.Stack>
      </Mui.Collapse>
    </Mui.Stack>
  );
};

EuiNavMenu.Parent = function ({ name, open, ...rest }) {
  return (
    <Style.SuiStack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ cursor: "pointer" }}
      pr={1}
      isOpen={open}
      {...rest}
    >
      <Mui.Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <GrSystem size={20} />
        <h3>{name || "name"}</h3>
      </Mui.Stack>

      {open ? <ExpandLess /> : <ExpandMore />}
    </Style.SuiStack>
  );
};

EuiNavMenu.Chil = function ({ linkName, ...rest }) {
  return (
    <Style.SuiStack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ cursor: "pointer" }}
      pr={1}
      {...rest}
    >
      <Mui.Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <ArrowForwardIosIcon />
        <p>{linkName}</p>
      </Mui.Stack>
    </Style.SuiStack>
  );
};

EuiNavMenu.NavBoard = function ({ name, ...rest }) {
  return (
    <Style.NavBoardStack width={"fit-content"} my={1} pb={1} {...rest}>
      <p>{name || "name"}</p>
    </Style.NavBoardStack>
  );
};

const Style = {
  SuiStack: styled(Mui.Stack)`
    color: ${(props) => (props.isOpen ? "red" : null)};
    :hover {
      color: red;
    }
  `,

  NavBoardStack: styled(Mui.Box)`
    color: ${(props) => (props.isOpen ? "red" : null)};
    border-bottom-color: red;
    border-bottom: ${(props) => (props.isOpen ? "3px solid" : null)};
    cursor: pointer;
    :hover {
      color: red;
      border-bottom: 3px solid;
    }
  `,
};
