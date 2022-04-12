import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export const Home = () => {
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  // class

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm bộ đề mới",
    "Đã Xoá bộ đề",
    "Lỗi hệ thống, chưa thể thêm đề thi mới"
  );
  const navigate = useNavigate();
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });
  const [isOpenDelete, setIsOpenDelete] = React.useState(false);
  const [search, setSearch] = React.useState({
    examTypeId: null,
    classId: null,
    subjectId: null,
    keyword: "",
    matrixId: null,
  });
  const [exam, setExam] = React.useState(null);
  const handleOpenDelete = new Class.HandlePopup(
    setIsOpenDelete,
    "",
    "Thêm mới thời gian làm bài"
  );
  //   function
  class Func {
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }

    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    onOpenDelete(id) {
      setExam(id);
      handleOpenDelete.open();
    }

    handleDelete = async () => {
      try {
        const res = await Api.testKitApi.delete(exam);
        console.log(res);
        handleSnack.delete("");
      } catch (error) {
        console.log(error);
      }
      handleOpenDelete.close();
    };

    handleSearch = async () => {
      try {
        const res = await Api.testKitApi.search(
          search.keyword,
          pages.page,
          pages.limit,
          search.examTypeId,
          search.matrixId,
          search.classId,
          search.subjectId
        );
        console.log(res);
        setPages({
          ...pages,
          data: res.data,
          total: Function.formatNumber.getTotalPage(res.total, pages.limit),
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  const func = new Func();
  React.useEffect(() => {
    func.handleSearch();
  }, [snack.isOpen]);
  return (
    <>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      {/* poppup */}
      <Ex.ExModalPoppup.Delete
        handleClose={() => handleOpenDelete.close()}
        open={isOpenDelete}
        handleDelete={func.handleDelete}
      />

      {/* content */}
      <Views.ViewContent title={"Tổ chức thi"}>
        <Mui.Stack spacing={3}>
          <Views.ViewBoard>
            <Mui.Grid container columnSpacing={5} rowSpacing={2}>
              <Item>
                <Ex.ExInputWrapper.Basic
                  label={"Đề thi đã khởi tạo"}
                  name={"keyword"}
                  onChange={func.handleChange}
                  value={search.keyword}
                  placeholder={"Nhập tên đề thi "}
                />
              </Item>
              <Item>
                <Ex.ExDataSelect.ExamType
                  label={"Dạng đề thi"}
                  name={"examTypeId"}
                  onChange={func.handleChange}
                  value={search.examTypeId}
                />
              </Item>
              <Item>
                <Ex.ExInputWrapper.Basic label={"Hình thức thi"} />
              </Item>
              <Item>
                <Ex.ExDataSelect.Class
                  label={"Chọn lớp"}
                  name={"classId"}
                  onChange={func.handleChange}
                  value={search.classId}
                />
              </Item>
              <Item>
                <Ex.ExDataSelect.Subject
                  label={"Chọn môn"}
                  name={"subjectId"}
                  onChange={func.handleChange}
                  value={search.subjectId}
                />
              </Item>
            </Mui.Grid>

            <Mui.Stack pt={5} direction={"row"} spacing={3}>
              <Eui.EuiButton.Search onClick={func.handleSearch} />
              <Link to="/khao-thi-tao-moi">
                <Eui.EuiButton.AddNew onClick={func.handleSearch} />
              </Link>
            </Mui.Stack>
          </Views.ViewBoard>

          {/* bang du lieu */}
          <Views.ViewBoard>
            <Eui.EuiTable dataColumn={dataColumn}>
              {pages.data
                ? pages.data.map((row, i) => (
                    <Eui.EuiTable.StyledTableRow key={i}>
                      <Eui.EuiTable.StyledTableCell align="center">
                        {Function.formatNumber.getSTT(
                          i,
                          pages.page,
                          pages.limit
                        )}
                      </Eui.EuiTable.StyledTableCell>

                      <Eui.EuiTable.StyledTableCell align="center">
                        {row.name || "name class"}
                      </Eui.EuiTable.StyledTableCell>
                      <Eui.EuiTable.StyledTableCell align="center">
                        {row?.numberOfQuestions || ""}
                      </Eui.EuiTable.StyledTableCell>
                      <Eui.EuiTable.StyledTableCell align="center">
                        {row?.testMethod}
                      </Eui.EuiTable.StyledTableCell>
                      <Eui.EuiTable.StyledTableCell align="center">
                        {row?.candidates?.length}
                      </Eui.EuiTable.StyledTableCell>
                      <Eui.EuiTable.StyledTableCell align="center">
                        {row?.timeCalculationType || ""}
                      </Eui.EuiTable.StyledTableCell>
                      <Eui.EuiTable.StyledTableCell align="center">
                        <Ex.ExIconEditDelete.ViewDelete
                          onDelete={() => func.onOpenDelete(row.id)}
                          onView={() => navigate(`${row.id}`)}
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
    </>
  );
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} md={6} lg={4}>
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
    name: "Tên bộ đề",
    width: 200,
  },
  {
    name: "Số câu hỏi",
    width: 200,
  },
  {
    name: "Hình thức thi",
    width: 200,
  },
  {
    name: "Số thí sinh",
    width: 200,
  },
  {
    name: "Thời gian",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
