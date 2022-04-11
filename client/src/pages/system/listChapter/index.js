import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";
import * as Class from "Class";
import { Update } from "./Update";
import moment from "moment";
export const PageSystemListChapter = () => {
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });
  const [search, setSearch] = React.useState({
    chapterName: "",
    classId: null,
    subjectId: null,
  });

  const [addingData, setAddingData] = React.useState({
    chapterName: "",
    classId: null,
    subjectId: null,
    code: "",
  });

  const [subject, setSubject] = React.useState(null);

  const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);

  const handleOpenUpdate = new Class.HandlePopup(setIsOpenUpdate);

  // life cirle
  React.useEffect(() => {
    if (search.classId) {
      Function.handler
        .api(() => Api.subjectApi.search(search.classId))
        .then((res) => {
          console.log(res);
          setSubject(res);
        })
        .catch((error) => console.log(error));
    }
    setSearch((s) => ({ ...s, subjectId: null }));
  }, [search.classId]);

  React.useEffect(() => {
    setAddingData((s) => ({ ...s, subjectId: null }));
  }, [addingData.classId]);

  // redux
  const reduxClass = useSelector((state) => state.reduxClass);

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
  handleSnack.setMessage("Đã thêm chủ đề mới, id: ", "Đã xoá chủ đề, id: ", "");

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới thời gian làm bài"
  );

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );

  class Func {
    getSTT(stt) {
      let num = (pages.page - 1) * pages.limit + stt;
      return num;
    }
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }
    getTotalPage(total) {
      return total / pages.limit + 1;
    }
    openDelete(id) {
      handleOpenDelete.open();
      setDeleteId(id);
    }
    onDelete = () => {
      Function.handler
        .api(() => Api.chapterApi.delete(deleteId))
        .then((res) => {
          console.log("on then");
          if (res?.response?.status === 400) {
            console.log("loi roi");
            console.log(res.response.data.message);
            handleSnack.error(res.response.data.message);
          } else {
            handleSnack.delete(deleteId);
          }
          handleOpenDelete.close();
        })
        .catch((error) => {
          console.log("lỗi: ");
          console.log(error.response);
        });
    };

    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
    };

    handleInput = (e) => {
      setAddingData({ ...addingData, [e.target.name]: e.target.value });
    };

    handleSearch = () => {
      console.log("thuc hien search nay");
      Function.handler
        .api(() =>
          Api.chapterApi.search(
            search.subjectId,
            search.classId,
            search.chapterName,
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
      if (addingData.chapterName && addingData.subjectId) {
        Function.handler
          .api(() =>
            Api.chapterApi.add(
              addingData.subjectId,
              addingData.chapterName,
              addingData.code,
              []
            )
          )
          .then((res) => {
            console.log(res);
            handleSnack.add(res.id);
            handleOpenNew.close();
          })
          .catch((error) => console.log(error));
      } else {
        handleSnack.error("Lỗi nhập liệu, hoàn thành bảng tạo");
      }
    };

    searchSubjectbyId = (id) => {
      if (subject) {
        const index = subject?.data.findIndex((data) => data.id === id);

        return subject?.data[index]?.name;
      }
    };

    searchClassById = (id) => {
      if (subject) {
        const index = reduxClass?.data.findIndex((data) => data.id === id);

        return reduxClass?.data[index]?.name;
      }
    };
    onEdit(id) {
      setDeleteId(id);
      handleOpenUpdate.open();
    }
  }

  const func = new Func();
  React.useEffect(() => {
    func.handleSearch();
  }, [snack, isOpenUpdate]);

  return (
    <Views.ViewContent title={"Danh sách chủ đề"}>
      {/* modal update */}
      <Update
        open={isOpenUpdate}
        handleClose={() => handleOpenUpdate.close()}
        id={deleteId}
      />
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
      <Ex.ExModalPoppup.Create
        open={open}
        handleClose={() => handleOpenNew.close()}
        handleCreate={func.handleAdd}
      >
        <Ex.ExDataSelect.Class
          onChange={func.handleInput}
          required
          value={addingData.classId}
        />

        <Mui.Divider />
        <Ex.ExDataSelect.Subject
          id={addingData.classId}
          onChange={func.handleInput}
          value={addingData.subjectId}
          required
        />
        <Mui.Divider />
        <Ex.ExInputWrapper.Basic
          label={"Tên chủ đề:"}
          name={"chapterName"}
          required
          onChange={func.handleInput}
        />
        <Mui.Divider />
        <Ex.ExInputWrapper.Basic
          label={"Mã chủ đề:"}
          name={"code"}
          required
          onChange={func.handleInput}
        />
      </Ex.ExModalPoppup.Create>

      <Mui.Stack spacing={0.5}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Ex.ExDataSelect.Class
                onChange={func.handleChange}
                value={search.classId}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Subject
                id={search.classId}
                onChange={func.handleChange}
                value={search.subjectId}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên chủ đề:"}
                name={"chapterName"}
                placeholder={"Nhập tên chủ đề"}
                onChange={func.handleChange}
              />
            </Item>
          </Mui.Grid>
          <Mui.Stack direction={"row"} py={2} spacing={2}>
            <Eui.EuiButton.OpenCreate
              name={"Thêm chủ đề"}
              onClick={() => handleOpenNew.open()}
            />
            <Eui.EuiButton.Search onClick={func.handleSearch} />
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
                      {row.subjectData?.classs?.name || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.subjectData?.name || "name mon"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "name class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.code || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {moment(row.createdAt).format("DD-MM-YYYY h:mm:ss")}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete
                        onDelete={() => func.openDelete(row.id)}
                        onEdit={() => func.onEdit(row.id)}
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
    <Mui.Grid item xs={12} md={6} xl={4}>
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
    width: 100,
  },
  {
    name: "Môn",
    width: 100,
  },
  {
    name: "Tên chủ đề",
  },
  {
    name: "Mã chủ đề",
    width: 100,
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
