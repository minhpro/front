import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import moment from "moment";
import * as Function from "functions";
import * as Api from "api";
import { useNavigate } from "react-router-dom";
import * as Co from "components";

export const Home = () => {
  // State
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  // hook

  const navigate = useNavigate();

  // Funcion

  async function getData() {
    try {
      const res = await Api.memberApi.myTest("", pages.page, pages.limit);

      setPages({
        ...pages,
        data: res.data,
        total: Function.formatNumber.getTotalPage(res.total, pages.limit),
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePagination(event, value) {
    console.log(value);
    setPages({ ...pages, page: value });
  }

  // Life circle

  React.useEffect(() => {
    getData();
  }, []);

  // component

  return (
    <Views.ViewContent title={"Danh sách bài thi"}>
      <Mui.Stack spacing={3}>
        {/* bang du lieu */}
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
                      {moment(row.start).format("DD-MM-YYYY h:mm:ss")}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {moment(row.end).format("DD-MM-YYYY h:mm:ss")}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.testMethod}
                    </Eui.EuiTable.StyledTableCell>

                    <Eui.EuiTable.StyledTableCell align="center">
                      <Method status={row.status} id={row.id} />
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
            onChange={handlePagination}
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

const Method = ({ status, id }) => {
  const navigate = useNavigate();
  switch (status) {
    case 0:
      return <Ex.ExIconEditDelete.Work onWork={() => navigate(`${id}`)} />;

    case 1:
      return <Ex.ExIconEditDelete.Wait onWait={() => navigate(`${id}`)} />;

    case 2:
      return <Ex.ExIconEditDelete.ViewOnly onView={() => navigate(`${id}`)} />;
    default:
      return <Ex.ExIconEditDelete.Work onWork={() => navigate(`${id}`)} />;
  }
};

const dataColumn = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Tên bài thi",
    width: 200,
  },
  {
    name: "Hình thức thi",
    width: 100,
  },

  {
    name: "Thời gian bắt đầu ",
    width: 200,
  },
  {
    name: "Thời gian kết thúc",
    width: 200,
  },

  {
    name: "Thao tác",
    width: 200,
  },
];
