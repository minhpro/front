import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
import {Link} from "react-router-dom";

export const OrganMatrix = () => {
    const [open, setIsOpen] = React.useState(false);
    const [search, setSearch] = React.useState({
        keyword: null,
        chapterId: null,
        classId: null,
        subjectId: null,
        unitName: "",
    });
    const [snack, setSnack] = React.useState({
        isOpen: false,
        message: "",
        severity: null,
    });

    const [matrix, setMatrix] = React.useState(null);

    //   function
    class Func {
        constructor() {
            this.message = {
                delete: "da xoa dang de, id:",
                null: "chua nhap ten dang de",
                add: "da them dang de, id: ",
            };
        }

        handleChange = (e) => {
            setSearch({...search, [e.target.name]: e.target.value});
            console.log(search);
        };

        handleSearch = () => {
            Function.handler
                .api(() => Api.matrixApi.search({
                    keyword: search.keyword,
                    classId: search.classId,
                    subjectId: search.subjectId,
                    testMatrixTargetId: search.testMatrixTargetId,
                    testTypeId: search.testTypeId,
                    page: 1,
                    limit: 32
                }))
                .then((res) => {
                    console.log(res);
                    setMatrix(res);
                })
                .catch((error) => console.log(error));
        };

        handleAdd = () => {
            if (search.unitName && search.chapterId) {
                Function.handler
                    .api(() => Api.unitApi.add(search.unitName, search.chapterId))
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => console.log(error));
            }
        };

        onSubmit = (e) => {
            e.preventDefault();
            console.log("submit");
        };
        onDelete = (id) => {
            Api.matrixApi.delete(id).then((res) => {
                setSnack({
                    isOpen: true,
                    message: "đã xoá ma trận đề thi",
                    severity: "warning",
                });
                func.handleSearch()
                console.log(res);
            }).catch((error) => {
                console.log("error:")
                console.log(error)
                setSnack({
                    isOpen: true,
                    message: error.message,
                    severity: "error",
                });
            });
        };

        onEdit = (e) => {
            console.log("submit");
        };

        handleClose = () => {
            setIsOpen(false);
        };
        handleOpen = () => {
            setIsOpen(true);
        };

        handleCloseSnack = () => {
            setSnack({
                isOpen: false,
                message: null,
                severity: null,
            });
        };
    }

    const func = new Func();
    React.useEffect(() => {
        func.handleSearch();
    }, []);
    return (
        <Views.ViewContent title={"Quản lý ma trận đề"}>
            <Mui.Stack spacing={0.5}>
                {/* nav */}
                <Eui.EuiSnackbar
                    open={snack.isOpen}
                    handleClose={func.handleCloseSnack}
                    message={snack.message}
                    severity={snack.severity}
                />
                <Views.ViewBoard>
                    <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
                        <Item>
                            <Ex.ExInputWrapper.Basic
                                label={"Tên ma trận đề thi:"}
                                name={"keyword"}
                                onChange={func.handleChange}
                            />
                        </Item>
                        <Item>
                            <Mui.Grid container columnSpacing={5}>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.Class onChange={func.handleChange}/>
                                </Mui.Grid>
                                <Mui.Grid item xs={6}>
                                    <Ex.ExDataSelect.Subject onChange={func.handleChange}/>
                                </Mui.Grid>
                            </Mui.Grid>
                        </Item>
                        <Item>
                            <Ex.ExDataSelect.MatrixTarget onChange={func.handleChange}/>
                        </Item>
                        <Item>
                            <Ex.ExDataSelect.ExamType onChange={func.handleChange}/>
                        </Item>
                    </Mui.Grid>
                    <Mui.Stack
                        direction={"row"}
                        spacing={2}
                        pt={2}
                        borderTop={"solid 1px"}
                        borderColor={"red"}
                    >
                        <Eui.EuiButton.Progress
                            name={"Tim kiem"}
                            onClick={func.handleSearch}
                        />
                        <Link to={"/tao-ma-tran-moi"}>
                            <Eui.EuiButton.Progress name={"Tao moi"}/>
                        </Link>
                    </Mui.Stack>
                </Views.ViewBoard>

                <Views.ViewBoard>
                    <Eui.EuiTable dataColumn={dataColumn}>
                        {matrix
                            ? matrix?.data.map((row, i) => (
                                <Eui.EuiTable.StyledTableRow key={i}>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {i + 1}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row.name || "name class"}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row?.testTypeData?.name || ""}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row?.subjectData?.classs?.name || ""}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row?.subjectData?.name || ""}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        <Ex.ExIconEditDelete
                                            onDelete={() => func.onDelete(row.id)}
                                            onEdit={func.onEdit}
                                        />
                                    </Eui.EuiTable.StyledTableCell>
                                </Eui.EuiTable.StyledTableRow>
                            ))
                            : null}
                    </Eui.EuiTable>
                </Views.ViewBoard>
            </Mui.Stack>
        </Views.ViewContent>
    );
};

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
        name: "Mã đề",
        width: 200,
    },
    {
        name: "Tên đề",
        width: 200,
    },
    {
        name: "Dạng đề",
        width: 200,
    },
    {
        name: "Lớp",
        width: 200,
    },
    {
        name: "Môn",
        width: 200,
    },
    {
        name: "Thao tác",
        width: 200,
    },
];
