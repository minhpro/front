import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const ListMemberGroup = () => {
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
      Api.groupApi
        .memberSearch("", pages.page, pages.limit)
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

    // onView(id) {
    //   setDetailId(id);
    //   handleOpen.open();
    // }
  }
  const func = new Func();

  React.useEffect(() => {
    func.getData();
  }, [pages.page]);

  return (
    <Views.ViewContent title={"Quản lý Thành viên > Danh sách nhóm"}>
      <Mui.Stack spacing={3}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên nhóm"}
                placeholder={"Nhap ten nhom"}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên nhóm trưởng"}
                placeholder={"Nhap ten nhom truong"}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select
                label={"Trạng thái"}
              ></Ex.ExInputWrapper.Select>
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
                      {Function.formatNumber.getSTT(i, pages.page, pages.limit)}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "name"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.leaderData.fullName || "phone"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.totalMember}
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
    name: "Tên nhóm",
    width: 200,
  },
  {
    name: "Nhóm trưởng",
    width: 200,
  },
  {
    name: "Số lượng thành viên",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];
