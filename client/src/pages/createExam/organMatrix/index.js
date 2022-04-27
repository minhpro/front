import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
import { Link } from "react-router-dom";
import * as Class from "Class";
import moment from "moment";
export const OrganMatrix = () => {
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });

  const [isDeteteOpen, setIsDeleteOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState(null);
  const [search, setSearch] = React.useState({
    keyword: null,
    chapterId: null,
    classId: null,
    subjectId: null,
    unitName: "",
    testTypeId: null,
    target: "EXAM",
  });
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );

  //   function
  class Func {
    constructor() {
      this.message = {
        delete: "da xoa dang de, id:",
        null: "chua nhap ten dang de",
        add: "da them dang de, id: ",
      };
    }
    openDelete(id) {
      handleOpenDelete.open();
      setDeleteId(id);
    }

    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };
    getTotalPage(total) {
      const number = total / pages.limit + 1;

      return parseInt(number);
    }
    handleSearch = () => {
      Function.handler
        .api(() =>
          Api.matrixApi.search({
            keyword: search.keyword,
            classId: search.classId,
            subjectId: search.subjectId,
            testMatrixTargetId: search.testMatrixTargetId,
            testTypeId: search.testTypeId,
            page: 1,
            limit: 32,
          })
        )
        .then((res) => {
          console.log(res);
          setPages({
            ...pages,
            total: this.getTotalPage(res.total),
            data: res.data,
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
      Api.matrixApi
        .delete(deleteId)
        .then((res) => {
          setSnack({
            isOpen: true,
            message: "đã xoá ma trận đề thi",
            severity: "warning",
          });
          func.handleSearch();
        })
        .catch((error) => {
          console.log("error:");
          console.log(error);
          setSnack({
            isOpen: true,
            message: error.message,
            severity: "error",
          });
        });
      handleOpenDelete.close();
    };

    onEdit = (e) => {
      console.log("submit");
    };

    handleCloseSnack = () => {
      setSnack({
        isOpen: false,
        message: null,
        severity: null,
      });
    };
    handlePagination(event, value) {
      setPages({ ...pages, page: value });
    }
    getSTT(stt) {
      let num = (pages.page - 1) * pages.limit + stt;
      return num;
    }
  }

  const func = new Func();

  React.useEffect(() => {
    func.handleSearch();
  }, [pages.page, isDeteteOpen]);

  function resets(name) {
    setSearch({ ...search, [name]: null });
  }

  React.useEffect(() => {
    resets("subjectId");
  }, [search.classId]);
  return (
    <Views.ViewContent title={"Quản lý ma trận đề"}>
      <Mui.Stack spacing={0.5}>
        {/* delete */}
        <Ex.ExModalPoppup.Delete
          open={isDeteteOpen}
          handleClose={() => handleOpenDelete.close()}
          handleDelete={func.onDelete}
        />
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
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    onChange={func.handleChange}
                    value={search.classId}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    onChange={func.handleChange}
                    value={search.subjectId}
                    id={search.classId}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExDataSelect.MatrixTarget
                onChange={func.handleChange}
                value={search.target}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.ExamType
                onChange={func.handleChange}
                value={search.testTypeId}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên ma trận đề thi:"}
                name={"keyword"}
                onChange={func.handleChange}
                placeholder={"Nhập tên ma trận đề thi"}
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
            <Link to={"/khao-thi/tao-ma-tran-moi"}>
              <Eui.EuiButton.OpenCreate />
            </Link>
            <Eui.EuiButton.Search onClick={func.handleSearch} />
          </Mui.Stack>
        </Views.ViewBoard>

        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {pages.data
              ? pages.data.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {func.getSTT(i + 1)}
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
                      {moment(row.createdAt).format("DD-MM-YYYY h:mm:ss")}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete.DeleteOnly
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
    name: "Tên Ma trận",
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
    name: "Thời gian tạo",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
