import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

export const PageSystemListChapter = () => {
  const [open, setIsOpen] = React.useState(false);
  class Func {
    constructor() {
      this.message = {
        delete: "da xoa dang de, id:",
        null: "chua nhap ten dang de",
        add: "da them dang de, id: ",
      };
    }

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
              <Ex.ExInputWrapper.Basic name={"Ten chuong:"} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select name={"Chon lop:"} data={data} />
            </Item>
            <Item>
              <Ex.ExInputWrapper.Select name={"Chon mon:"} data={data} />
            </Item>
          </Mui.Grid>
          <Mui.Stack direction={"row"} py={2} spacing={2}>
            <Eui.EuiButton.Progress />
            <Eui.EuiButton.Progress />
          </Mui.Stack>
        </Views.ViewBoard>

        {/* bang du lieu */}
        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {rowData
              ? rowData.data.map((row, i) => (
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
