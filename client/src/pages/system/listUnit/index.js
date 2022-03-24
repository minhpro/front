import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";

export const PageSystemListUnit = () => {
  // redux
  const reduxClass = useSelector((state) => state.reduxClass);
  const [open, setIsOpen] = React.useState(false);

  const [search, setSearch] = React.useState({
    chapterId: null,
    classId: null,
    subjectId: null,
    unitName: "",
  });

  const [unit, setUnit] = React.useState(null);

  //   function
  class Func {
    constructor() {
      this.message = {
        delete: "da xoa dang de, id:",
        null: "chua nhap ten dang de",
        add: "da them dang de, id: ",
      };
    }
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleSearch = () => {
      Function.handler
        .api(() => Api.unitApi.search(search.chapterId, search.unitName))
        .then((res) => {
          console.log(res);
          setUnit(res);
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
    onDelete = (id) => {
      Function.handler
        .api(() => Api.unitApi.delete(id))
        .then((res) => {
          console.log(res);
        })
        .catch((error) => console.log(error));
    };

    onEdit = (e) => {
      console.log("submit");
    };

    handleClose = () => {
      setIsOpen(false);
    };
    handleOpen = () => {
      setIsOpen(true);
    };
  }

  const func = new Func();

  return (
    <Views.ViewContent title={"Danh sach bai"}>
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
                label={"Ten bai:"}
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
              name={"tim kiem"}
              onClick={func.handleSearch}
            />
            <Eui.EuiButton.Progress
              name={"them bai moi"}
              onClick={func.handleAdd}
            />
          </Mui.Stack>
        </Views.ViewBoard>

        {/* bang du lieu */}

        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {unit
              ? unit.data.map((row, i) => (
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
                      <Ex.ExIconEditDelete
                        onDelete={() => func.onDelete(row.id)}
                        onEdit={func.onEdit}
                      />
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
    name: "Lop",
    width: 200,
  },
  {
    name: "Mon",
    width: 200,
  },
  {
    name: "Ten chuong",
    width: 200,
  },
  {
    name: "Ten bai",
    width: 200,
  },
  {
    name: "Thao tac",
    width: 200,
  },
];
