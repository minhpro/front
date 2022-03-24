import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";

export const PageSystemListChapter = () => {
  const [open, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState({
    chapterName: "",
    classId: null,
    subjectId: null,
  });

  const [subject, setSubject] = React.useState(null);
  const [chapter, setChapter] = React.useState(null);

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
  }, [search.classId]);

  // redux
  const reduxClass = useSelector((state) => state.reduxClass);
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
        .api(() =>
          Api.chapterApi.search(
            search.subjectId,
            search.classId,
            search.chapterName
          )
        )
        .then((res) => {
          console.log(res);
          setChapter(res);
        })
        .catch((error) => console.log(error));
    };

    onSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
    };
    onDelete = () => {
      console.log("submit");
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
    <Views.ViewContent title={"Danh sach chuong"}>
      <Mui.Stack spacing={0.5}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Ten chuong:"}
                name={"chapterName"}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select
                label={"Chon lop:"}
                name={"classId"}
                data={reduxClass?.data}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select
                label={"Chon mon:"}
                name={"subjectId"}
                data={subject?.data}
              />
            </Item>
          </Mui.Grid>
          <Mui.Stack direction={"row"} py={2} spacing={2}>
            <Eui.EuiButton.Progress />
            <Eui.EuiButton.Progress
              name={"tim kiem"}
              onClick={func.handleSearch}
            />
          </Mui.Stack>
        </Views.ViewBoard>

        {/* bang du lieu */}
        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {chapter
              ? chapter.data.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {i + 1}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.des || "name class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.chapter || "list class"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete
                        onDelete={func.onDelete}
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
    <Mui.Grid item xs={12} md={6} xl={4}>
      {children}
    </Mui.Grid>
  );
};

const data = [
  {
    id: 21,
    name: "asdads",
  },
];

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
    name: "Thao tac",
    width: 200,
  },
];

const rowData = {
  data: [
    { name: "dasasd", des: "adsasd", chapter: "chuong" },
    { name: "dasasd", des: "adsasd", chapter: "chuong" },
  ],
};
