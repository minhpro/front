import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
import { Link, useNavigate } from "react-router-dom";
import * as Class from "Class";
import { ViewCreateExam } from "./view/ViewCreateExam";
import { ViewExam } from "./view/ViewExam";
import moment from "moment";
export const OrganExam = () => {
  const navigate = useNavigate();
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });

  const [search, setSearch] = React.useState({
    examTypeId: null,
    classId: null,
    subjectId: null,
    testName: "",
    matrixId: null,
    testCode: "",
  });

  const [isView, setIsView] = React.useState(false);
  const [open, setIsOpen] = React.useState(false);
  const [isDeteteOpen, setIsDeleteOpen] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState(null);
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  // class

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm đề thi mới ",
    "Đã xoá đề thi, id: ",
    "Lỗi hệ thống, chưa thể thêm đề thi mới"
  );

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới thời gian làm bài"
  );

  const handleOpenView = new Class.HandlePopup(setIsView, "", "Chi tiees ");

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );
  //   function
  class Func {
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }
    getTotalPage(total) {
      const number = total / pages.limit + 1;

      return parseInt(number);
    }
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleSearch = () => {
      Function.handler
        .api(() =>
          Api.examApi.search(
            search.testName,
            search.examTypeId,
            search.matrixId,
            search.classId,
            search.subjectId,
            pages.page,
            pages.limit
          )
        )
        .then((res) => {
          console.log(res);
          setPages({
            ...pages,
            data: res.data,
            total: this.getTotalPage(res.total),
          });
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
    onDelete = () => {
      Function.handler
        .api(() => Api.examApi.delete(deleteId))
        .then((res) => {
          console.log(res);
          handleSnack.delete(res.id);
        })
        .catch((error) => console.log(error));
      handleOpenDelete.close();
    };

    onOpenDelete(id) {
      handleOpenDelete.open();
      setDeleteId(id);
    }
    onOpenView(id) {
      handleOpenView.open();
      setDeleteId(id);
    }

    onEdit(id) {
      console.log(id);
      navigate(`${id}`);
    }
    getSTT(stt) {
      let num = (pages.page - 1) * pages.limit + stt;
      return num;
    }
  }

  const func = new Func();
  React.useEffect(() => {
    func.handleSearch();
  }, [snack]);

  React.useEffect(() => {
    setSearch({ ...search, subjectId: null });
  }, [search.classId]);
  React.useEffect(() => {
    setSearch({ ...search, matrixId: null });
  }, [search.subjectId]);

  function resets(name) {
    setSearch({ ...search, [name]: null });
  }

  React.useEffect(() => {
    resets("subjectId");
  }, [search.classId]);

  React.useEffect(() => {
    resets("matrixId");
  }, [search.subjectId]);

  return (
    <Views.ViewContent title={"Quản lý đề gốc"}>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      {/* popup */}
      <Ex.ExModalPoppup.Delete
        open={isDeteteOpen}
        handleClose={() => handleOpenDelete.close()}
        handleDelete={func.onDelete}
      />
      <Eui.EuiModal.Title
        open={open}
        handleClose={() => handleOpenNew.close()}
        title={"Tạo đề thi mới"}
      >
        <ViewCreateExam
          handleClose={() => handleOpenNew.close()}
          handleSnack={() => handleSnack.add("")}
          handleError={() => handleSnack.error("")}
        />
      </Eui.EuiModal.Title>

      <Eui.EuiModal.Title
        open={isView}
        handleClose={() => handleOpenView.close()}
        title={"Chi tiết đề thi"}
      >
        <ViewExam id={deleteId} />
      </Eui.EuiModal.Title>

      <Mui.Stack spacing={0.5}>
        {/* nav */}
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
              <Ex.ExDataSelect.Matrix
                id={search.subjectId}
                onChange={func.handleChange}
                value={search.matrixId || ""}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.ExamType value={search.examTypeId || ""} />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExInputWrapper.Basic
                    label={"Mã đề thi:"}
                    name={"testCode"}
                    onChange={func.handleChange}
                    placeholder={"Nhập mã đề thi"}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên đề thi:"}
                name={"testName"}
                onChange={func.handleChange}
                placeholder={"Nhập tên đề thi"}
              />
            </Item>
          </Mui.Grid>
          <Mui.Stack
            direction={"row"}
            spacing={2}
            pt={2}
            borderTop={"solid 1px"}
            borderColor={"red"}
          >
            <Link to={"/khao-thi/tao-de-thi-moi"}>
              <Eui.EuiButton.OpenCreate />
            </Link>

            <Eui.EuiButton.Search onClick={func.handleSearch} />
          </Mui.Stack>
        </Views.ViewBoard>

        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {pages.data
              ? pages.data?.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {func.getSTT(i + 1)}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.code}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "name class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.testMatrixData?.name}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.testMatrixData?.subjectData?.classs?.name}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.testMatrixData?.subjectData?.name}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.numberOfQuestions}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {moment(row.createdAt).format("DD-MM-YYYY h:mm:ss")}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete.ViewDelete
                        onDelete={() => func.onOpenDelete(row.id)}
                        onView={() =>func.onEdit(row.id)}
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

const Item = ({ children }) => {
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
    name: "Ma trận đề thi",
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
    name: "Số lượng câu hỏi",
    width: 200,
  },
  {
    name: "Thời gian tạo",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 100,
  },
];
