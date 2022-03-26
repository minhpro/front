import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React, { useState } from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";

export const PageSystemListUnit = () => {
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });
  // redux

  const [open, setIsOpen] = React.useState(false);

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

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );
  //   function
  class Func {
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

    handleAdd = () => {
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
          if (res?.response?.status == 400) {
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
            />
            <Mui.Divider />
            <Ex.ExDataSelect.Class onChange={func.handleChange} />
            <Mui.Divider />
            <Ex.ExDataSelect.Subject
              id={search.classId}
              onChange={func.handleChange}
            />
            <Mui.Divider />
            <Ex.ExDataSelect.Chapter
              id={search.subjectId}
              onChange={func.handleChange}
            />
          </Mui.Grid>
          <Mui.Grid item xs={12} md={6}>
            <Mui.Stack
              component={"form"}
              onSubmit={func.onSubmitAddRequirement}
            >
              <Ex.ExInputWrapper.Basic
                label={"Thêm yêu cầu kiến thức:"}
                name={"requireName"}
                value={requirements.input}
                onChange={(e) =>
                  setRequirements({ ...requirements, input: e.target.value })
                }
              />
              {requirements.data.map((data, i) => {
                return <p>{data.name}</p>;
              })}
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
        handleClose={func.handleCloseSnack}
        message={snack.message}
        severity={snack.severity}
      />
      <Mui.Stack spacing={0.5}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Ex.ExDataSelect.Class onChange={func.handleChange} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Subject
                id={search.classId}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Chapter
                id={search.subjectId}
                onChange={func.handleChange}
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
            <Eui.EuiButton.Progress
              name={"tìm kiếm"}
              onClick={func.handleSearch}
            />
            <Eui.EuiButton.Progress
              name={"thêm đơn vị kiến thức"}
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
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.chapterData?.name || "list class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "list class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete.View
                        onDelete={() => func.openDelete(row.id)}
                        onEdit={func.onEdit}
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
    width: 200,
  },
  {
    name: "Môn",
    width: 200,
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
    width: 200,
  },
];
