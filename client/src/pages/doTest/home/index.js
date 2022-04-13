import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import moment from "moment";
import * as Function from "functions";
import * as Api from "api";
import { useNavigate } from "react-router-dom";

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

      setPages({ ...pages, data: res.data, total: res.total });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  // Life circle

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <Views.ViewContent title={"Danh sách bài thi"}>
      <Mui.Stack spacing={3}>
        {/* <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2}>
            <Item>
              <Ex.ExInputWrapper.Basic label={"Đề thi đã khởi tạo"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.ExamType label={"Dạng đề thi"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Target label={"Hình thức thi"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Class label={"Chọn lớp"} />
            </Item>
            <Item>
              <Ex.ExDataSelect.Subject label={"Chọn môn"} />
            </Item>
          </Mui.Grid>

          <Mui.Stack pt={5}>
            <Eui.EuiButton.Progress name={"Tim kiem"} />
          </Mui.Stack>
        </Views.ViewBoard> */}

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
                      {row.worked ? (
                        <Ex.ExIconEditDelete.ViewOnly
                        // onDelete={() => func.onDelete(row.id)}
                        // onEdit={func.onEdit}
                        />
                      ) : (
                        <Ex.ExIconEditDelete.Work
                          onWork={() => navigate(`${row.id}`)}
                        />
                      )}
                    </Eui.EuiTable.StyledTableCell>
                  </Eui.EuiTable.StyledTableRow>
                ))
              : null}
          </Eui.EuiTable>
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
    name: "Tên bài thi",
    width: 200,
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
