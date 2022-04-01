import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React, { useState } from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import * as View from "./view";

export const PageSystemListUnit = () => {
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });

  // redux

  const [open, setIsOpen] = React.useState(false);
  const [isOpenView, setIsOpenView] = React.useState(false);

  const [search, setSearch] = React.useState({
    chapterId: null,
    classId: null,
    subjectId: null,
    unitName: "",
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
    onSubmitAddRequirement(e) {
      e.preventDefault();
      let data = requirements.data;
      data.push({ name: requirements.input });
      setRequirements({ input: "", data: data });
    }
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }
    getTotalPage(total) {
      return total / pages.limit + 1;
    }
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
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
          console.log(res);
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
      if (search.unitName && search.chapterId) {
        Function.handler
          .api(() =>
            Api.unitApi.add(
              search.unitName,
              search.chapterId,
              requirements.data
            )
          )
          .then((res) => {
            handleSnack.add(search.unitName);
            this.handleSearch();
            console.log(res);
          })
          .catch((error) => console.log(error));
        handleOpenNew.close();
      }
    };

    onDelete = () => {
      Function.handler
        .api(() => Api.unitApi.delete(deleteId))
        .then((res) => {
          if (res?.response?.status === 400) {
            setSnack({
              isOpen: true,
              message: res.response.data.message,
              severity: "error",
            });
          } else {
            handleSnack.delete();
            this.handleSearch();
          }
          console.log(res);
        })
        .catch((error) => {
          console.log("loi nay");
          console.log(error);
        });
      handleOpenDelete.close();
    };
  }

  const func = new Func();
  React.useEffect(() => {
    func.handleSearch();
  }, [pages.page, isDeteteOpen]);

  return (
    <Views.ViewContent title={"Danh sách đơn vị kiến thức"}>
      {/* view require */}

      <Ex.ExModalPoppup.ViewQuestion
        open={isOpenView}
        handleClose={() => handleOpenView.close()}
        // handleCreate={func.handleAdd}
        title={handleOpenView.title}
      >
        <View.ViewUnit data={data} />
      </Ex.ExModalPoppup.ViewQuestion>

      <Ex.ExModalPoppup.Create
        open={open}
        handleClose={() => handleOpenNew.close()}
        handleCreate={func.handleAdd}
      >
        <Mui.Grid container columnSpacing={2}>
          <Mui.Grid item xs={12} md={6}>
            <Ex.ExInputWrapper.Basic
              label={"Tên đơn vị kiến thức:"}
              name={"unitName"}
              onChange={func.handleChange}
              placeholder={"Nhap ten don vi kien thuc"}
              required
            />
            <Mui.Divider />
            <Ex.ExDataSelect.Class
              onChange={func.handleChange}
              value={search.classId}
              required
            />
            <Mui.Divider />
            <Ex.ExDataSelect.Subject
              id={search.classId}
              onChange={func.handleChange}
              value={search.subjectId}
              required
            />
            <Mui.Divider />
            <Ex.ExDataSelect.Chapter
              id={search.subjectId}
              onChange={func.handleChange}
              value={search.chapterId}
              required
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6}>
            <Mui.Stack
              // onSubmit={func.onSubmitAddRequirement}
              placeholder={"Nhap yeu cau cua don vi kien thuc"}
              spacing={2}
            >
              <Ex.ExInputWrapper.Basic
                label={"Thêm yêu cầu kiến thức:"}
                name={"requireName"}
                placeholder={"Thêm yêu cầu kiến thức"}
                value={requirements.input}
                onChange={(e) =>
                  setRequirements({ ...requirements, input: e.target.value })
                }
                // onSubmit={func.onSubmitAddRequirement}
              />
              <Eui.EuiButton.OpenCreate
                name={"Thêm yêu cầu kiến thức"}
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
                      </Eui.EuiTable.StyledTableRow>
                    ))
                  : null}
              </Eui.EuiTable>
            </Mui.Stack>
          </Mui.Grid>
        </Mui.Grid>
      </Ex.ExModalPoppup.Create>
      <Ex.ExModalPoppup.Delete
        open={isDeteteOpen}
        handleClose={() => handleOpenDelete.close()}
        handleDelete={func.onDelete}
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
              <Ex.ExDataSelect.Chapter
                id={search.subjectId}
                onChange={func.handleChange}
                value={search.chapterId}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên đơn vị kiến thức:"}
                name={"unitName"}
                onChange={func.handleChange}
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
            <Eui.EuiButton.Search onClick={func.handleSearch} />
            <Eui.EuiButton.OpenCreate
              name={"Thêm đơn vị kiến thức"}
              onClick={() => handleOpenNew.open()}
            />
          </Mui.Stack>
        </Views.ViewBoard>

        {/* bang du lieu */}

        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {pages.data
              ? pages.data.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {i + 1}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.chapterData?.subjectData?.classs?.name || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.chapterData?.subjectData.name || "name class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="left">
                      {row.chapterData?.name || "list class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="left">
                      {row.name || "list class"}
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
    name: "Lớp",
    width: 100,
  },
  {
    name: "Môn",
    width: 100,
  },
  {
    name: "Chủ đề",
    width: 200,
  },
  {
    name: "Đơn vị kiến thức",
    width: 200,
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
    name: "Yêu cầu kiến thức",
  },
];
