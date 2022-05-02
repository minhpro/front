import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React, {useState} from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import * as View from "./view";
import {Update} from "./Update";
import moment from "moment";

export const PageSystemListUnit = () => {
    const [pages, setPages] = React.useState({
        data: null,
        page: 1,
        total: 1,
        limit: 32,
    });

    // redux

    const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);

    const handleOpenUpdate = new Class.HandlePopup(setIsOpenUpdate);

    const [open, setIsOpen] = React.useState(false);
    const [isOpenView, setIsOpenView] = React.useState(false);

    const [search, setSearch] = React.useState({
        chapterId: null,
        classId: null,
        subjectId: null,
        unitName: "",
    });

    const [add, setAdd] = React.useState({
        chapterId: null,
        classId: null,
        subjectId: null,
        unitName: "",
        code: "",
    });

    const [requirements, setRequirements] = useState({
        input: "",
        data: [],
    });

    const [isDeteteOpen, setIsDeleteOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState(null);
    const [snack, setSnack] = React.useState({
        isOpen: false,
        message: "",
        severity: null,
    });

    const [data, setData] = React.useState(null);

    // class

    const handleSnack = new Class.HandleSnack(setSnack);
    handleSnack.setMessage(
        "Đã thêm đơn vị kiến thức mới",
        "Đã xoá đớn vị kiến thức, id: ",
        ""
    );

    const handleOpenNew = new Class.HandlePopup(
        setIsOpen,
        "",
        "Thêm đơn vị kiến thức mới"
    );

    const handleOpenView = new Class.HandlePopup(
        setIsOpenView,
        "",
        "Chi tiết câu hỏi"
    );

    const handleOpenDelete = new Class.HandlePopup(
        setIsDeleteOpen,
        "",
        "Xác nhận xoá?"
    );

    //   function
    class Func {
        getSTT(stt) {
            let num = (pages.page - 1) * pages.limit + stt;
            return num;
        }

        onView(id) {
            setDeleteId(id);
            handleOpenView.open();
            Function.handler
                .api(() => Api.unitApi.detail(id))
                .then((res) => {
                    console.log(res);
                    setData(res);
                })
                .catch((error) => console.log(error));
        }

        onSubmitAddRequirement() {
            if (requirements.input === "") {
                return null;
            }
            let data = requirements.data;

            const newData = data.filter((e) => e.name !== requirements.input);
            newData.push({name: requirements.input});
            setRequirements({input: "", data: newData});
        }

        onDeleteRequirement(name) {
            const data = requirements.data;
            console.log(name);
            const datad = data.filter((item) => item.name !== name);
            console.log(datad);
            setRequirements({...requirements, data: datad.concat()});
        }

        handlePagination(event, value) {
            setPages({...pages, page: value});
        }

        getTotalPage(total) {
            return Math.ceil(total / pages.limit);
        }

        handleChange = (e) => {
            setSearch({...search, [e.target.name]: e.target.value});
            console.log(search);
        };

        handleChangeAdd = (e) => {
            setAdd({...add, [e.target.name]: e.target.value});
        };

        openDelete(id) {
            handleOpenDelete.open();
            setDeleteId(id);
        }

        handleSearch = () => {
            Function.handler
                .api(() =>
                    Api.unitApi.search(
                        search.chapterId,
                        search.subjectId,
                        search.classId,
                        search.unitName,
                        pages.page,
                        pages.limit
                    )
                )
                .then((res) => {
                    setPages({
                        ...pages,
                        total: this.getTotalPage(res.total),
                        data: res.data,
                    });
                })
                .catch((error) => console.log(error));
        };

        handleAdd = (e) => {
            e.preventDefault();
            if (requirements.data.length === 0) {
                return handleSnack.error("Chưa có yêu cầu kiến thức");
            }

            if (add.unitName && add.chapterId) {
                Function.handler
                    .api(() =>
                        Api.unitApi.add(add.unitName, add.chapterId, requirements.data)
                    )
                    .then((res) => {
                        handleSnack.add(add.unitName);
                        this.handleSearch();
                        setAdd({...add, unitName: ""});
                    })
                    .catch((error) => console.log(error));
                handleOpenNew.close();
            }
        };

        onDelete = async () => {
            try {
                const res = await Api.unitApi.delete(deleteId);
                handleSnack.delete(res.id);
                this.handleSearch();
            } catch (error) {
                console.log("loi nay");
                setSnack({
                    isOpen: true,
                    message: error.response.data.message,
                    severity: "error",
                });
            }
            handleOpenDelete.close();
        };

        onEdit(id) {
            setDeleteId(id);
            handleOpenUpdate.open();
        }
    }

    const func = new Func();
    React.useEffect(() => {
        func.handleSearch();
    }, [pages.page, isDeteteOpen, isOpenUpdate]);

    function resets(name) {
        setSearch({...search, [name]: null});
    }

    React.useEffect(() => {
        resets("subjectId");
    }, [search.classId]);

    React.useEffect(() => {
        resets("chapterId");
    }, [search.subjectId]);

    return (
        <Views.ViewContent title={"Danh sách đơn vị kiến thức"}>
            {/* modal update */}
            <Update
                open={isOpenUpdate}
                handleClose={() => handleOpenUpdate.close()}
                id={deleteId}/>

            {/* view require */}

            <Ex.ExModalPoppup.ViewQuestion
                title={"Chi tiết đơn vị kiến thức"}
                open={isOpenView}
                handleClose={() => handleOpenView.close()}
                // handleCreate={func.handleAdd}
                // title={handleOpenView.title}
            >
                <View.ViewUnit data={data}/>
            </Ex.ExModalPoppup.ViewQuestion>

            <Ex.ExModalPoppup.Create
                title={"Tạo mới đơn vị kiến thức"}
                open={open}
                handleClose={() => handleOpenNew.close()}
                handleCreate={func.handleAdd}>
                <Mui.Grid container columnSpacing={2}>
                    <Mui.Grid item xs={12} md={6}>
                        <Ex.ExDataSelect.Class
                            onChange={func.handleChangeAdd}
                            value={add.classId || ""}
                            required
                        />
                        <Mui.Divider/>
                        <Ex.ExDataSelect.Subject
                            id={add.classId}
                            onChange={func.handleChangeAdd}
                            value={add.subjectId  || ""}
                            required
                        />
                        <Mui.Divider/>
                        <Ex.ExDataSelect.Chapter
                            id={add.subjectId}
                            onChange={func.handleChangeAdd}
                            value={add.chapterId  || ""}
                            required
                        />
                        <Mui.Divider/>
                        <Ex.ExInputWrapper.Basic
                            label={"Tên đơn vị kiến thức:"}
                            name={"unitName"}
                            onChange={func.handleChangeAdd}
                            placeholder={"Nhập tên đơn vị kiến thức"}
                            required
                        />
                    </Mui.Grid>
                    <Mui.Grid item xs={12} md={6}>
                        <Mui.Stack
                            // onSubmit={func.onSubmitAddRequirement}

                            spacing={2}
                        >
                            <Ex.ExInputWrapper.Basic
                                label={"Thêm yêu cầu cần đạt:"}
                                name={"requireName"}
                                placeholder={"Thêm yêu cầu cần đạt"}
                                value={requirements.input}
                                onChange={(e) =>
                                    setRequirements({...requirements, input: e.target.value})
                                }
                                // onSubmit={func.onSubmitAddRequirement}
                            />
                            <Eui.EuiButton.OpenCreate
                                name={"Thêm yêu cầu cần đạt"}
                                onClick={func.onSubmitAddRequirement}
                            />

                            <Eui.EuiTable dataColumn={dataColumn2}>
                                {requirements.data
                                    ? requirements.data.map((row, i) => (
                                        <Eui.EuiTable.StyledTableRow key={i}>
                                            <Eui.EuiTable.StyledTableCell align="center">
                                                {i + 1}
                                            </Eui.EuiTable.StyledTableCell>
                                            <Eui.EuiTable.StyledTableCell align="center">
                                                {row.name || "name"}
                                            </Eui.EuiTable.StyledTableCell>
                                            <Eui.EuiTable.StyledTableCell align="center">
                                                <Ex.ExIconEditDelete.DeleteOnly
                                                    onDelete={() => func.onDeleteRequirement(row.name)}
                                                />
                                            </Eui.EuiTable.StyledTableCell>
                                        </Eui.EuiTable.StyledTableRow>
                                    ))
                                    : null}
                            </Eui.EuiTable>
                        </Mui.Stack>
                    </Mui.Grid>
                </Mui.Grid>
            </Ex.ExModalPoppup.Create>
            {/* <Ex.ExModalPoppup.Delete
        open={isDeteteOpen}
        handleClose={() => handleOpenDelete.close()}
        handleDelete={func.onDelete}
      /> */}

            <Ex.ModalConfirm.DeleteConfirm
                open={isDeteteOpen}
                onClose={() => handleOpenDelete.close()}
                onFunc={func.onDelete}
            />
            <Eui.EuiSnackbar
                open={snack.isOpen}
                handleClose={() => handleSnack.close()}
                message={snack.message}
                severity={snack.severity}
            />
            <Mui.Stack spacing={0.5}>
                <Views.ViewBoard>
                    <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
                        <Item>
                            <Ex.ExDataSelect.Class
                                onChange={func.handleChange}
                                value={search.classId || ""}
                            />
                        </Item>
                        <Item>
                            <Ex.ExDataSelect.Subject
                                id={search.classId}
                                onChange={func.handleChange}
                                value={search.subjectId || ""}
                            />
                        </Item>
                        <Item>
                            <Ex.ExDataSelect.Chapter
                                id={search.subjectId}
                                onChange={func.handleChange}
                                value={search.chapterId || ""}
                            />
                        </Item>
                        <Item>
                            <Ex.ExInputWrapper.Basic
                                label={"Từ khoá:"}
                                name={"unitName"}
                                onChange={func.handleChange}
                                placeholder={"Nhập từ khoá"}
                            />
                        </Item>
                    </Mui.Grid>
                    <Mui.Stack
                        borderTop={"solid 1px"}
                        borderColor={"primary.main"}
                        direction={"row"}
                        justifyContent={"flex-start"}
                        pt={2}
                        spacing={2}
                    >
                        <Eui.EuiButton.OpenCreate
                            name={"Thêm đơn vị kiến thức"}
                            onClick={() => handleOpenNew.open()}
                        />
                        <Eui.EuiButton.Search onClick={func.handleSearch}/>
                    </Mui.Stack>
                </Views.ViewBoard>

                {/* bang du lieu */}

                <Views.ViewBoard>
                    <Eui.EuiTable dataColumn={dataColumn}>
                        {pages.data
                            ? pages.data.map((row, i) => (
                                <Eui.EuiTable.StyledTableRow key={i}>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {func.getSTT(i + 1)}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row.chapterData?.subjectData?.classs?.name || "code"}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row.chapterData?.subjectData.name || "name class"}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row.chapterData?.name || "list class"}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row.name || "list class"}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {row.code || "code"}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        {moment(row.createdAt).format("DD-MM-YYYY h:mm:ss")}
                                    </Eui.EuiTable.StyledTableCell>
                                    <Eui.EuiTable.StyledTableCell align="center">
                                        <Ex.ExIconEditDelete.View
                                            onDelete={() => func.openDelete(row.id)}
                                            onEdit={() => func.onEdit(row.id)}
                                            onView={() => func.onView(row.id)}
                                        />
                                    </Eui.EuiTable.StyledTableCell>
                                </Eui.EuiTable.StyledTableRow>
                            ))
                            : null}
                    </Eui.EuiTable>
                    <Eui.EuiPagination
                        count={pages.total}
                        defaultPage={1}
                        siblingCount={0}
                        boundaryCount={2}
                        size={"large"}
                        shape={"rounded"}
                        onChange={func.handlePagination}
                    />
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
        name: "Lớp",
        width: 60,
    },
    {
        name: "Môn",
        width: 60,
    },
    {
        name: "Chủ đề",
        width: 150,
    },
    {
        name: "Đơn vị kiến thức",
        width: 150,
    },
    {
        name: "Mã",
        width: 50,
    },
    {
        name: "Thời gian tạo",
        width: 150,
    },
    {
        name: "Thao tác",
        width: 100,
    },
];

const dataColumn2 = [
    {
        name: "STT",
        width: 50,
    },
    {
        name: "Yêu cầu cần đạt",
    },
    {
        name: "Xoá",
        width: 50,
    },
];
