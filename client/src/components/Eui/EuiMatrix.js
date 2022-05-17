import * as Mui from "@mui/material";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import * as Slide from "redux/slide";
import styled from "styled-components";
import * as Eui from "./";
import {EuiInput} from "./EuiInput";

export const EuiMatrix = ({data, icon, indexData}) => {
    const questionTypesData = useSelector((s) => s.reduxQuestionType);
    const dataNumber = useSelector((state) => state.reduxQuestionDistributions);

    return (
        <Mui.Stack spacing={2}>
            <EuiMatrix.Parent
                name={data.name || "name"}
                icon={icon}
                number={data.numberOfQuestions}
                max={data.questionCount}
            >
                <Mui.Stack ml={2}>
                    <p>Danh sách Đơn vị kiến thức:</p>
                    {data.unitData.map((unit, i) => {
                        return (
                            <EuiMatrix.Parent
                                name={unit.name}
                                key={i}
                                number={unit.numberOfQuestions}
                                max={unit.questionCount}
                                nameType={`ĐVKT ${i + 1}`}
                            >
                                <Mui.Stack ml={2}>
                                    <p>Yêu cầu cần đạt:</p>
                                    <Eui.EuiTable dataColumn={dataColumn}>
                                        {unit?.requirements?.map((row, i) => (
                                            <EuiMatrix.Chil2 data={row} i={i + 1}
                                                             key={i}
                                                             max={row.questionCount}/>
                                        ))}
                                    </Eui.EuiTable>
                                    {/* do kho */}
                                    <p>độ khó câu hỏi:</p>
                                    {/*<p>{JSON.stringify(dataNumber?.number?.filter(item => item.numberOfQuestions > 0))}</p>*/}
                                    <Eui.EuiTable dataColumn={dataColumn2}>
                                        {questionTypesData?.data?.map((row, ii) => (
                                            <EuiMatrix.Chil3
                                                data={row}
                                                // max={unit?.requirements}
                                                i={ii + 1}
                                                key={ii}
                                                indexData={indexData}
                                                unitId={i}
                                            />
                                        ))}
                                    </Eui.EuiTable>
                                </Mui.Stack>
                            </EuiMatrix.Parent>
                        );
                    })}
                </Mui.Stack>
            </EuiMatrix.Parent>
        </Mui.Stack>
    );
};

EuiMatrix.Parent = function Parent({
                                       name,
                                       number,
                                       max,
                                       icon,
                                       nameType,
                                       children,
                                       ...rest
                                   }) {
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
                sx={{cursor: "pointer"}}
                pr={1}
                isOpen={open}
                onClick={handleClick}
                {...rest}
            >
                <Mui.Stack
                    direction={"column"}
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    spacing={0.5}
                >
                    <h3>
                        {nameType || "Tên chủ đề"}: {name || "name"}
                    </h3>
                    <p> Số câu hỏi: {number || 0} / {max || 0}</p>
                </Mui.Stack>

                {open ? <ExpandLess/> : <ExpandMore/>}
            </Style.SuiStack>
            <Mui.Collapse in={open} timeout="auto" unmountOnExit>
                <Mui.Stack spacing={1}>{children}</Mui.Stack>
            </Mui.Collapse>
        </Mui.Stack>
    );
};

EuiMatrix.Chil2 = function Chil({data, i, max, ...rest}) {
    const dispatch = useDispatch();

    function handChange(e) {
        if (e.target.value && parseInt(e.target.value) < (max || 0) && parseInt(e.target.value) > 0) {
            const payload = {requireID: data.id, number: parseInt(e.target.value)};
            dispatch(
                Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
            );
        } else {
            const payload = {requireID: data.id, number: parseInt(0)};
            dispatch(
                Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
            );
        }
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
                    {data?.questionCount}
                </Eui.EuiTable.StyledTableCell>
                <Eui.EuiTable.StyledTableCell align="center">
                    {/* <Style.Input
            type={"number"}
            value={data.numberOfQuestions}
            onChange={handChange}
          /> */}
                    <EuiInput
                        type={"number"}
                        value={data.numberOfQuestions}
                        onChange={handChange}
                    />
                </Eui.EuiTable.StyledTableCell>
            </Eui.EuiTable.StyledTableRow>
        </>
    );
};

EuiMatrix.Chil = function Chil({data, ...rest}) {
    const dispatch = useDispatch();

    function handChange(e) {
        const payload = {requireID: data.id, number: parseInt(e.target.value)};
        dispatch(
            Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
        );
    }

    return (
        <Style.SuiStack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{cursor: "pointer"}}
            pr={1}
        >
            <Mui.Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={2}
            >
                <Style.Input
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

EuiMatrix.NavBoard = function ({name, ...rest}) {
    return (
        <Style.NavBoardStack width={"fit-content"} my={1} pb={1} {...rest}>
            <p>{name || "name"}</p>
        </Style.NavBoardStack>
    );
};

const Style = {
    SuiStack: styled(Mui.Stack)`
        /* color: ${(props) => (props.isOpen ? "red" : null)}; */
      transform-origin: left;

      :hover {
        transform: translateY(-5px) scale(1.05);
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
    Input: styled.input`
      text-align: center;
      width: 100%;
    `,
};

EuiMatrix.Chil3 = function Chil({data, i, max, indexData, unitId, ...rest}) {
    const dispatch = useDispatch();
    const questionTypesData = useSelector((s) => s.reduxQuestionDistributions);

    function handChange(e) {
        if (e.target.value) {
            const payload = {
                questionType: {
                    id: data.id,
                    numberOfQuestions: parseInt(e.target.value),
                },
                indexData: indexData,
                unitId: unitId,
            };
            dispatch(Slide.questionDistributionsSlide.updateQuestionType(payload));
        } else {
            const payload = {requireID: data.id, number: parseInt(0)};
            dispatch(
                Slide.questionDistributionsSlide.updateQuestionDistributions(payload)
            );
        }
    }

    const hi = questionTypesData?.data[indexData]?.unitData[
        unitId
        ]?.questionTypes?.find((s) => s.id === data.id);
    console.log(hi?.numberOfQuestions);

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
                    {max || 0}
                </Eui.EuiTable.StyledTableCell>

                <Eui.EuiTable.StyledTableCell align="center">
                    <EuiInput
                        type={"number"}
                        defaultValue={0}
                        value={hi?.numberOfQuestions || 0}
                        onChange={handChange}
                    />
                </Eui.EuiTable.StyledTableCell>
            </Eui.EuiTable.StyledTableRow>
        </>
    );
};

const dataColumn = [
    {
        name: "STT",
        width: 50,
    },
    {
        name: "Tên yêu cầu cần đạt",
        width: 200,
    },
    {
        name: "Số câu hỏi tối đa",
        width: 200,
    },
    {
        name: "Số câu",
        width: 100,
    },
];

const dataColumn2 = [
    {
        name: "STT",
        width: 50,
    },
    {
        name: "Mức độ câu hỏi",
        width: 200,
    },
    {
        name: "Số câu hỏi tối đa",
        width: 200,
    },
    {
        name: "Số câu",
        width: 100,
    },
];
