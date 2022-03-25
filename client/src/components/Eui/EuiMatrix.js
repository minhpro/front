import * as Mui from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as Slide from "redux/slide";
import styled from "styled-components";

export const EuiMatrix = ({ data, icon }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Mui.Stack spacing={2}>
      <EuiMatrix.Parent
        onClick={handleClick}
        open={open}
        name={data.name || "name"}
        icon={icon}
        number={data.numberOfQuestions}
      />
      <Mui.Collapse in={open} timeout="auto" unmountOnExit>
        <Mui.Stack spacing={1}>
          {data.unitData.map((unit, i) => {
            return <EuiMatrix.Chil key={i} data={unit} />;
          })}
        </Mui.Stack>
      </Mui.Collapse>
    </Mui.Stack>
  );
};

EuiMatrix.Parent = function ({ name, number, open, icon, ...rest }) {
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
        <p> {number || 0}</p>

        <h3>{name || "name"}</h3>
      </Mui.Stack>

      {open ? <ExpandLess /> : <ExpandMore />}
    </Style.SuiStack>
  );
};

EuiMatrix.Chil = function Chil({ data, ...rest }) {
  const dispatch = useDispatch();

  function handChange(e) {
    const payload = { unitId: data.id, number: parseInt(e.target.value) };
    dispatch(
      Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
    );
  }
  return (
    <Style.SuiStack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
      sx={{ cursor: "pointer" }}
      pr={1}
    >
      <Mui.Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}
      >
        <input {...rest} type={"number"} onChange={handChange} />
        <p>{data.name}</p>
      </Mui.Stack>
    </Style.SuiStack>
  );
};

EuiMatrix.NavBoard = function ({ name, ...rest }) {
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
