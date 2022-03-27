import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import * as View from "./view";
import { Link } from "react-router-dom";

export const ListQuestion = () => {
  // redux

  const [questionList, setQuestionList] = React.useState(null);
  const [pages, setPages] = React.useState({
    page: 1,
    total: 10,
    limit: 32,
  });
  // const [page, setPage] = React.useState(1);
  // const handleChange = (event, value) => {
  //   setPage(value);
  // };

  const [search, setSearch] = React.useState({
    chapterId: null,
    classId: null,
    subjectId: null,
    unitId: null,
    questionName: "",
  });

  const [open, setIsOpen] = React.useState(false);
  const [isDeteteOpen, setIsDeleteOpen] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState(null);

  const [questionId, setQuestionId] = React.useState(null);
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  // class

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm loại câu hỏi mới, id: ",
    "Đã xoá loại câu hỏi, id: ",
    "Lỗi hệ thống, không thể xoá"
  );

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới loại câu hỏi"
  );

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );

  //  func

  //   function
  class Func {
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }
    getTotalPage(total) {
      return total / pages.limit + 1;
    }
    onView(id) {
      setQuestionId(id);
      handleOpenNew.open();
    }

    openDelete(id) {
      handleOpenDelete.open();
      setDeleteId(id);
    }

    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleSearch = () => {
      Function.handler
        .api(() =>
          Api.questionApi.search(
            search.unitId,
            search.questionName,
            null,
            pages.page,
            pages.limit
          )
        )
        .then((res) => {
          console.log(res);
          setPages({ ...pages, total: this.getTotalPage(res.total) });
          setQuestionList(res);
        })
        .catch((error) => console.log(error));
    };

    onDelete = () => {
      Function.handler
        .api(() => Api.questionApi.delete(deleteId))
        .then((res) => {
          handleSnack.delete("");
        })
        .catch((error) => console.log(error));
      handleOpenDelete.close();
    };
  }

  const func = new Func();

  React.useEffect(() => {
    func.handleSearch();
  }, [pages.page, snack]);

  return (
    <Views.ViewContent title={"Danh sách câu hỏi"}>
      {/* snack */}
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      {/* modal delete */}
      <Eui.EuiModal.Title
        open={isDeteteOpen}
        handleClose={() => handleOpenDelete.close()}
        w={"80%"}
        mw={300}
        title={"Xác nhận xoá?"}
      >
        <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
          <Eui.EuiButton.Cancel onClick={() => handleOpenDelete.close()} />
          <Eui.EuiButton.Progress name={"Xoá"} onClick={func.onDelete} />
        </Mui.Stack>
      </Eui.EuiModal.Title>

      {/* view cau hoi */}

      <Ex.ExModalPoppup.ViewQuestion
        open={open}
        handleClose={() => handleOpenNew.close()}
      >
        <View.ViewQuestion id={questionId} />
      </Ex.ExModalPoppup.ViewQuestion>

      {/* view */}
      <Mui.Stack spacing={0.5}>
        <Views.ViewBoard>
          <Mui.Stack>
            <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
              <ItemOne>
                <Ex.ExInputWrapper.Basic
                  label={"Tên câu hỏi"}
                  name={"questionName"}
                  onChange={func.handleChange}
                />
              </ItemOne>
              <ItemOne>
                <Mui.Grid container columnSpacing={2}>
                  <Mui.Grid item xs={6}>
                    <Ex.ExDataSelect.Class onChange={func.handleChange} />
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Ex.ExDataSelect.Subject
                      onChange={func.handleChange}
                      id={search.classId}
                    />
                  </Mui.Grid>
                </Mui.Grid>
              </ItemOne>
              <ItemOne>
                <Ex.ExDataSelect.Chapter
                  onChange={func.handleChange}
                  id={search.subjectId}
                />
              </ItemOne>
              <ItemOne>
                <Ex.ExDataSelect.Units
                  onChange={func.handleChange}
                  id={search.chapterId}
                />
              </ItemOne>
            </Mui.Grid>
            <Mui.Stack
              pt={2}
              borderColor={"primary.main"}
              borderTop={"solid 2px"}
              direction={"row"}
              spacing={2}
            >
              <Eui.EuiButton.Progress
                name={"Tìm kiếm"}
                onClick={func.handleSearch}
              />
              <Link to="/them-cau-tu-luan-EBD">
                <Eui.EuiButton.Progress
                  name={"Thêm mới câu tự luận"}
                  onClick={func.handleSearch}
                />
              </Link>
              <Link to={"/them-cau-trac-nghiem-EDB"}>
                <Eui.EuiButton.Progress
                  name={"Thêm mới câu trắc nghiệm"}
                  onClick={func.handleSearch}
                />
              </Link>
            </Mui.Stack>
          </Mui.Stack>
        </Views.ViewBoard>
        {/* bang du lieu */}
        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {questionList
              ? questionList.data.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {i + 1}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.code || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.unitData?.chapterData?.subjectData?.classs?.name ||
                        "name class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.unitData?.chapterData?.subjectData?.name ||
                        "list class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "ten cau hoi"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.questionTypeData?.name || "do kho"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete.View
                        onDelete={() => func.openDelete(row.id)}
                        onEdit={func.onEdit}
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

const ItemOne = ({ children }) => {
  return (
    <Mui.Grid item xs={12} md={6}>
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
    name: "Mã câu hỏi",
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
    name: "Tên câu hỏi",
    width: 200,
  },
  {
    name: "Độ khó",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
