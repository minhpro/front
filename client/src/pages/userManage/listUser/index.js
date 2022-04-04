import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";
import * as Class from "Class";

export const ListUser = () => {
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });
  const [search, setSearch] = React.useState({
    fullName: "",
    code: "",
    roleId: null,
    groupId: null,
  });
  class Func {
    handlePagination(event, value) {
      setPages({ ...pages, page: value });
    }
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
    };
    getData() {
      Api.userApi
        .search("", pages.page, pages.limit)
        .then((res) => {
          console.log(res);
          setPages({
            ...pages,
            data: res.data,
            total: Function.formatNumber.getTotalPage(res.total, pages.limit),
          });
        })
        .catch((err) => console.log(err));
    }
  }

  const func = new Func();

  React.useEffect(() => {
    func.getData();
  }, [pages.page]);

  return (
    <Views.ViewContent title={"Quản lý user > Danh sách User"}>
      <Mui.Stack spacing={3}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"ID người dùng:"}
                name={"code"}
                onChange={func.handleChange}
                placeholder={"Nhap ID nguoi dung"}
                value={search.code}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên người dùng:"}
                name={"fullName"}
                placeholder={"Nhap ten nguoi dung"}
                onChange={func.handleChange}
                value={search.fullName}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Role
                value={search.roleId}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Group
                value={search.roleId}
                onChange={func.handleChange}
              />
            </Item>
          </Mui.Grid>

          <Mui.Stack pt={5} direction={"row"} spacing={3}>
            <Eui.EuiButton.Search />
            <Eui.EuiButton.AddNew />
          </Mui.Stack>
        </Views.ViewBoard>

        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {pages.data
              ? pages.data.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.code || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.fullName || "name"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="left">
                      {row.phone || "phone"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="left">
                      {row.email || "email"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.role || "role"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.groupData?.name || "group"}
                    </Eui.EuiTable.StyledTableCell>
                    {/* <Eui.EuiTable.StyledTableCell align="left">
                      {row.createdAt || "ngay"}
                    </Eui.EuiTable.StyledTableCell> */}
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
    <Mui.Grid item xs={12} md={6}>
      {children}
    </Mui.Grid>
  );
};

const dataColumn = [
  {
    name: "ID",
    width: 50,
  },
  {
    name: "Họ tên",
    width: 300,
  },
  {
    name: "Số điện thoại",
    width: 200,
  },
  {
    name: "Email",
    width: 200,
  },
  {
    name: "Vai trò",
    width: 200,
  },
  {
    name: "Nhóm",
    width: 200,
  },
  // {
  //   name: "Ngày tạo",
  //   width: 200,
  // },
  {
    name: "Thao tác",
    width: 200,
  },
];
