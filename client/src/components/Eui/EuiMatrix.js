import * as Mui from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as Slide from "redux/slide";
import styled from "styled-components";
import * as Eui from "./";

export const EuiMatrix = ({ data, icon }) => {
  const dispatch = useDispatch();

  function handChange(e) {
    console.log("asd");
    const payload = { requireID: data.id, number: parseInt(e.target.value) };
    dispatch(
      Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
    );
  }
  return (
    <Mui.Stack spacing={2}>
      <EuiMatrix.Parent
        name={data.name || "name"}
        icon={icon}
        number={data.numberOfQuestions}
      >
        <p>Danh sách Đơn vị kiến thức</p>
        {data.unitData.map((unit, i) => {
          return (
            <EuiMatrix.Parent
              name={unit.name}
              key={i}
              number={unit.numberOfQuestions}
            >
              <p>Yêu cầu kiến thức</p>

              <Eui.EuiTable dataColumn={dataColumn}>
                {unit.requirements
                  ? unit.requirements?.map((row, i) => (
                      <EuiMatrix.Chil2 data={row} i={i + 1} key={i} />
                    ))
                  : null}
              </Eui.EuiTable>
              {unit.requirements?.map((require, i) => {
                return <EuiMatrix.Chil data={require} key={i} />;
              })}
            </EuiMatrix.Parent>
          );
        })}
      </EuiMatrix.Parent>
    </Mui.Stack>
  );
};

EuiMatrix.Parent = function Parent({ name, number, icon, children, ...rest }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Mui.Stack spacing={2}>
      <Style.SuiStack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ cursor: "pointer" }}
        pr={1}
        isOpen={open}
        onClick={handleClick}
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
      <Mui.Collapse in={open} timeout="auto" unmountOnExit>
        <Mui.Stack spacing={1}>{children}</Mui.Stack>
      </Mui.Collapse>
    </Mui.Stack>
  );
};

EuiMatrix.Chil2 = function Chil({ data, i, ...rest }) {
  const dispatch = useDispatch();

  function handChange(e) {
    const payload = { requireID: data.id, number: parseInt(e.target.value) };
    dispatch(
      Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
    );
  }
  return (
    <>
      <Eui.EuiTable.StyledTableRow>
        <Eui.EuiTable.StyledTableCell align="center">
          {i}
        </Eui.EuiTable.StyledTableCell>
        <Eui.EuiTable.StyledTableCell align="center">
          {data.name}
        </Eui.EuiTable.StyledTableCell>

        <Eui.EuiTable.StyledTableCell align="center">
          {data.numberOfQuestions}
        </Eui.EuiTable.StyledTableCell>
        <Eui.EuiTable.StyledTableCell align="center">
          <input
            type={"number"}
            value={data.numberOfQuestions}
            onChange={handChange}
          />
        </Eui.EuiTable.StyledTableCell>
      </Eui.EuiTable.StyledTableRow>
    </>
  );
};

EuiMatrix.Chil = function Chil({ data, ...rest }) {
  const dispatch = useDispatch();

  function handChange(e) {
    const payload = { requireID: data.id, number: parseInt(e.target.value) };
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
        <input
          {...rest}
          type={"number"}
          value={data.numberOfQuestions}
          onChange={handChange}
        />
        <p>{data.numberOfQuestions}</p>
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

const dataColumn = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Tên yêu cầu kiến thức",
    // width: 200,
  },
  {
    name: "Số câu",
    width: 50,
  },
  {
    name: "Thao tác",
    width: 50,
  },
];
