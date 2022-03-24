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

    handleAdd = () => {
      if (search.chapterName && search.subjectId) {
        Function.handler
          .api(() =>
            Api.chapterApi.add(search.subjectId, search.chapterName, "code", [])
          )
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
        .api(() => Api.chapterApi.delete(id))
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
  React.useEffect(()=>{
    func.handleSearch()
  }, [])

  React.useEffect(()=>{
    console.log(search)
  })

  return (
    <Views.ViewContent title={"Danh sách chủ đề"}>
      <Mui.Stack spacing={0.5}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên chủ đề:"}
                name={"chapterName"}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select
                label={"Chọn lớp:"}
                name={"classId"}
                data={reduxClass?.data}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select
                label={"Chọn môn:"}
                name={"subjectId"}
                data={subject?.data}
                onChange={func.handleChange}
              />
            </Item>
          </Mui.Grid>
          <Mui.Stack direction={"row"} py={2} spacing={2}>
            <Eui.EuiButton.Progress
              name={"Thêm mới chương"}
              onClick={func.handleAdd}
            />
            <Eui.EuiButton.Progress
              name={"tìm kiếm"}
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
                      {row.subjectData?.classs?.name || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.subjectData?.name || "name mon"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row.name || "name class"}
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
    name: "Lớp",
    width: 200,
  },
  {
    name: "Môn",
    width: 200,
  },
  {
    name: "Tên chủ đề",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];

const rowData = {
  data: [
    { name: "dasasd", des: "adsasd", chapter: "chuong" },
    { name: "dasasd", des: "adsasd", chapter: "chuong" },
  ],
};
