import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import {useLocation, Navigate, Outlet, useNavigate} from "react-router-dom";

const CreatePermutationExam = () => {
    const navigate = useNavigate();

    const [pages, setPages] = React.useState({
        data: null,
        page: 1,
        total: 10,
        limit: 32,
    });

    const [search, setSearch] = React.useState({
        testTypeId: null,
        classId: null,
        subjectId: null,
        testName: "",
        matrixId: null,
        testCode: "",
        testId: null,
    });

    const [errorAdd, setErrorAdd] = React.useState(false)


    const [kits, setKits] = React.useState([]);

    const [add, setAdd] = React.useState({
        name: "",

        numberOfQuestions: 1,
        numberOfTests: 1,
        start: "2022-03-27T15:54:52.780966",
        end: "2022-03-27T15:54:52.780966",
        testMethod: "ONLINE",
        target: "EXAM",
        timeCalculationType: "BY_TEST",
        candidateIds: [],
        // kits: [],
    });

    const [name, setName] = React.useState({
        testName: "",
    });
    const [number, setNumber] = React.useState({
        testQuestionTotal: "",
    });

    const [isOpen, setIsOpen] = React.useState(false);
    const [snack, setSnack] = React.useState({
        isOpen: false,
        message: "",
        severity: null,
    });
    // class

    const handleSnack = new Class.HandleSnack(setSnack);
    handleSnack.setMessage(
        "Đã thêm bộ đề mới",
        "Đã trộn bộ đề",
        "Lỗi hệ thống, chưa thể thêm đề thi mới"
    );

    const handleOpenNew = new Class.HandlePopup(
        setIsOpen,
        "",
        "Thêm mới thời gian làm bài"
    );

    //   function
    class Func {
        handlePagination(event, value) {
            console.log(value);
            setPages({...pages, page: value});
        }

        handleChange = (e) => {
            console.log("change test type: ")
            console.log(e)
            setSearch({...search, [e.target.name]: e.target.value});
            console.log(search);
        };

        handleNameChange = (e) => {
            setName({...name, [e.key]: e.value});
            console.log("name change:")
            console.log(e)
            console.log(name)
        };

        handleChangeAdd = (e) => {
            setAdd({...add, [e.target.name]: e.target.value});
            console.log(search);
        };

        async handleGen() {
            try {
                const res = await Api.testKitApi.generate(
                    search.testId,
                    add.numberOfQuestions,
                    add.numberOfTests
                );
                console.log(res);

                setKits(res.map(item => Object.assign(item, {"testName": name.testName})));
            } catch (error) {
                handleSnack.custom2(error?.response?.data?.message)
                console.log(error);
            }
        }

        async handleAdd(e) {
            e.preventDefault();

            if (kits === null) {
                return;
            }
            let body = {
                ...add,
                testId: search.testId,
                kits: [],
            };

            kits.forEach((item) => {
                body.kits.push({code: item.code, questionIds: []});
            });

            for (let i = 0; i < kits.length; i++) {
                body.kits.push({code: kits[i].code, questionIds: []});

                for (let j = 0; j < kits[i].questions.length; j++) {
                    body.kits[i].questionIds.push(kits[i].questions[j].id);
                }
            }

            try {
                const res = await Api.testKitApi.add(body);
                console.log(res);
                handleSnack.add("");
                handleOpenNew.close();
            } catch (error) {
                console.log(error);
            }
        }

        handleSearch = () => {
            Function.handler
                .api(() =>
                    Api.examApi.search(
                        search.testName,
                        search.testTypeId,
                        search.matrixId,
                        search.classId,
                        search.subjectId,
                        pages.page,
                        pages.limit
                    )
                )
                .then((res) => {
                    console.log("search exam day:");
                    console.log(res);
                    setPages({
                        ...pages,
                        data: res.data,
                        total: Function.formatNumber.getTotalPage(res.total, pages.limit),
                    });
                })
                .catch((error) => console.log(error));
        };
    }

    const func = new Func();
    React.useEffect(() => {
        func.handleSearch();
    }, []);

    React.useEffect(() => {
        setSearch({...search, subjectId: null});
    }, [search.classId]);
    React.useEffect(() => {
        setSearch({...search, matrixId: null});
    }, [search.subjectId]);

    React.useEffect(() => {
        func.handleSearch();
    }, [search.subjectId]);

    React.useEffect(() => {
        if (add.numberOfTests > 10) {
            setErrorAdd(true)
            console.log("loi 10")
            setAdd({...add, numberOfTests: 10})
        } else {
            setErrorAdd(false)
        }

        if (add.numberOfTests < 0) {
            setErrorAdd(true)
            setAdd({...add, numberOfTests: 0})
            console.log("loi 0")
        } else {
            setErrorAdd(false)
        }
    }, [add.numberOfTests])

    return (
        <>
            {/* thong bao */}
            <Eui.EuiSnackbar
                open={snack.isOpen}
                handleClose={() => handleSnack.close()}
                message={snack.message}
                severity={snack.severity}
            />

            {/* tim kiem */}
            <Views.ViewContent title={"Tạo mới đề hoán vị"}>
                <Views.ViewBoard>
                    <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
                        <Item>
                            <Mui.Grid container columnSpacing={5}>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.Class
                                        onChange={func.handleChange}
                                        value={search.classId || ""}
                                    />
                                </Mui.Grid>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.Subject
                                        id={search.classId}
                                        onChange={func.handleChange}
                                        value={search.subjectId || ""}
                                    />
                                </Mui.Grid>
                            </Mui.Grid>
                        </Item>
                        <Item>
                            <Mui.Grid container columnSpacing={5}>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.Matrix
                                        id={search.subjectId}
                                        onChange={func.handleChange}
                                        value={search.matrixId || ""}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.Test
                                        id={search.matrixId}
                                        onChange={func.handleChange}
                                        onNameChange={func.handleNameChange}
                                        value={search.testId || ""}
                                    />

                                </Mui.Grid>
                            </Mui.Grid>

                        </Item>
                        <Item>
                            <Mui.Grid container columnSpacing={5}>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.ExamType
                                        value={search.testTypeId || ""}
                                        onChange={func.handleChange}
                                    />
                                </Mui.Grid>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExInputWrapper.Basic
                                        label={"Số lượng đề thi:"}
                                        required
                                        type={"number"}
                                        name={"numberOfTests"}
                                        value={add.numberOfTests}
                                        onChange={func.handleChangeAdd}
                                        error={true}
                                    />
                                </Mui.Grid>
                            </Mui.Grid>
                        </Item>

                    </Mui.Grid>
                    <Mui.Stack
                        direction={"row"}
                        spacing={2}
                        pt={2}
                        borderTop={"solid 1px"}
                        borderColor={"red"}
                    >
                        <Eui.EuiButton.AddType
                            onClick={func.handleGen}
                            name={"Trộn câu hỏi"}
                        />
                    </Mui.Stack>
                </Views.ViewBoard>

                {/*bang du lieu*/}
                <Views.ViewBoard>
                    <Eui.EuiTable dataColumn={dataColumn}>
                        {(kits || []).map((row, i) => (
                            <Eui.EuiTable.StyledTableRow key={i}>
                                <Eui.EuiTable.StyledTableCell align="center">
                                    {i + 1}
                                </Eui.EuiTable.StyledTableCell>
                                <Eui.EuiTable.StyledTableCell align="center">
                                    {row?.testName || ""}
                                </Eui.EuiTable.StyledTableCell>
                                <Eui.EuiTable.StyledTableCell align="center">
                                    {row.code || ""}
                                </Eui.EuiTable.StyledTableCell>
                            </Eui.EuiTable.StyledTableRow>
                        ))}
                    </Eui.EuiTable>
                    {/*<Eui.EuiPagination*/}
                    {/*    count={pages.total}*/}
                    {/*    defaultPage={1}*/}
                    {/*    siblingCount={0}*/}
                    {/*    boundaryCount={2}*/}
                    {/*    size={"large"}*/}
                    {/*    shape={"rounded"}*/}
                    {/*    onChange={func.handlePagination}*/}
                    {/*/>*/}
                </Views.ViewBoard>

                {/*button add*/}
                <Views.ViewBoard>
                    <Mui.Stack spacing={3}>
                        <Eui.EuiButton.OpenCreate onClick={func.handleAdd} />
                    </Mui.Stack>
                </Views.ViewBoard>
            </Views.ViewContent>
        </>
    );
};

export default CreatePermutationExam;

const Item = ({children}) => {
    return (
        <Mui.Grid item xs={12} lg={6}>
            {children}
        </Mui.Grid>
    );
};

const dataColumn = [
    {
        name: "STT",
        width: 50,
    },
    {
        name: "Đề gốc",
        width: 200,
    },
    {
        name: "Đề hoán vị",
        width: 200,
    }
];
