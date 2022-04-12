import * as Mui from "@mui/material";
import React from "react";
import { GrSystem } from "react-icons/gr";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

export const EuiNavMenu = ({ data, icon }) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation().pathname;
  const pathnames = location.split("/").filter((x) => x);

  const handleClick = () => {
    setOpen(!open);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  console.log("ads", pathnames[0], "sad");

  React.useEffect(() => {
    for (let i = 0; i < data.nav.length; i++) {
      if (data.nav[i].link === pathnames[1]) {
        handleOpen();
        break;
      } else {
        handleClose();
      }
    }
  }, [location]);
  return (
    <Mui.Stack>
      <EuiNavMenu.Parent
        onClick={handleClick}
        open={open}
        name={data.name || "name"}
        icon={icon}
      />
      <Mui.Collapse in={open} timeout="auto" unmountOnExit>
        <Mui.Stack spacing={1}>
          {data.nav.map((nav, i) => {
            return (
              <Link key={i} to={nav.link || "/"}>
                <EuiNavMenu.Chil linkName={nav.name} link={nav.link} />
              </Link>
            );
          })}
        </Mui.Stack>
      </Mui.Collapse>
    </Mui.Stack>
  );
};

EuiNavMenu.Parent = function ({ name, open, icon, ...rest }) {
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
        {icon ? icon : <GrSystem size={20} />}

        <h3>{name || "name"}</h3>
      </Mui.Stack>

      {open ? <ExpandLess /> : <ExpandMore />}
    </Style.SuiStack>
  );
};

EuiNavMenu.Chil = function Chil({ linkName, link, ...rest }) {
  const location = useLocation().pathname;
  const pathnames = location.split("/").filter((x) => x);

  return (
    <Style.SuiStack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ cursor: "pointer" }}
      pr={1}
      {...rest}
      isOpen={link === pathnames[1]}
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
    font-weight: ${(props) => (props.isOpen ? 600 : 400)};
    :hover {
      color: red;
    }
  `,

  NavBoardStack: styled(Mui.Box)`
    color: ${(props) => (props.isOpen ? "red" : null)};
    border-bottom-color: red;
    border-bottom: ${(props) => (props.isOpen ? "3px solid" : null)};

    cursor: pointer;

    p {
      font-weight: ${(props) => (props.isOpen ? "600" : "400")};
    }
    :hover {
      color: red;
      border-bottom: 3px solid;
    }
  `,
};
