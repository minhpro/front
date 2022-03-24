import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

import * as Function from "functions";
import * as Api from "api";

export const ListQuestion = () => {
  // redux

  const [open, setIsOpen] = React.useState(false);

  const [questionList, setQuestionList] = React.useState(null);

  const [search, setSearch] = React.useState({
    chapterId: null,
    classId: null,
    subjectId: null,
    unitId: null,
    questionName: "",
  });

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
      console.log("search");
      Function.handler
        .api(() => Api.questionApi.search(search.unitId, search.questionName))
        .then((res) => {
          console.log(res);
          setQuestionList(res);
        })
        .catch((error) => console.log(error));
    };

    onSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
    };
    onDelete = (id) => {
      Function.handler
        .api(() => Api.questionApi.delete(id))
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
    <Views.ViewContent title={"Danh sach cau hoi"}>
      <Mui.Stack spacing={0.5}>
        <Views.ViewBoard>
          <Mui.Stack>
            <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
              <ItemOne>
                <Ex.ExInputWrapper.Basic
                  label={"Ten cau hoi"}
                  name={"questionName"}
                  onChange={func.handleChange}
                />
              </ItemOne>
              <ItemOne>
                <Mui.Grid container columnSpacing={2}>
                  <Mui.Grid item xs={6}>
                    <Ex.ExDataSelect.Class onChange={func.handleChange} />
                  </Mui.Grid>
                  <Mui.Grid item xs={6}>
                    <Ex.ExDataSelect.Subject
                      onChange={func.handleChange}
                      id={search.classId}
                    />
                  </Mui.Grid>
                </Mui.Grid>
              </ItemOne>
              <ItemOne>
                <Ex.ExDataSelect.Chapter
                  onChange={func.handleChange}
                  id={search.subjectId}
                />
              </ItemOne>
              <ItemOne>
                <Ex.ExDataSelect.Units
                  onChange={func.handleChange}
                  id={search.chapterId}
                />
              </ItemOne>
            </Mui.Grid>
            <Mui.Stack
              pt={2}
              borderColor={"primary.main"}
              borderTop={"solid 2px"}
            >
              <Eui.EuiButton.Progress
                name={"Tim kiem"}
                onClick={func.handleSearch}
              />
            </Mui.Stack>
          </Mui.Stack>
        </Views.ViewBoard>
        {/* bang du lieu */}
        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {questionList
              ? questionList.data.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {i + 1}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.code || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.unitData?.chapterData.subjectData.classs.name ||
                        "name class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.unitData?.chapterData.subjectData.name ||
                        "list class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "ten cau hoi"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.questionTypeData.name || "do kho"}
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

const ItemOne = ({ children }) => {
  return (
    <Mui.Grid item xs={12} md={6}>
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
    name: "Ma cau hoi",
    width: 200,
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
    name: "Ten cau hoi",
    width: 200,
  },
  {
    name: "Do kho",
    width: 200,
  },
  {
    name: "Thao tac",
    width: 200,
  },
];
