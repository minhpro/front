import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Element from "../../element";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";

export const TypeExam = () => {
  // redux
  const reduxTestType = useSelector((state) => state.reduxTestType);
  const [open, setIsOpen] = React.useState(false);

  const [data, setData] = React.useState({
    typeExam: "",
    des: "",
  });

  class Func {
    constructor() {
      this.message = {
        delete: "da xoa dang de, id:",
        null: "chua nhap ten dang de",
        add: "da them dang de, id: ",
      };
    }
    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    };

    onSubmit = (e) => {
      e.preventDefault();

      Function.handler
        .api(() => Api.testTypeApi.add(data.typeExam))
        .then((res) => {
          this.handleClose();
        })
        .catch((error) => console.log(error));
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
    <>
      {/* modal */}
      <Eui.EuiModal.Title
        open={open}
        handleClose={func.handleClose}
        w={"80%"}
        mw={400}
        title={"Thêm mới dạng đề thi"}
      >
        <Mui.Stack spacing={2} component={"form"} onSubmit={func.onSubmit}>
          <Ex.ExInputWrapper.Basic
            label={"Loại đề thi"}
            name={"typeExam"}
            onChange={func.handleChange}
            required
            placeholder="Nhập loại đề thi"
          />
          <Ex.ExInputWrapper.Multiline
            label={"Mô tả"}
            name={"des"}
            onChange={func.handleChange}
            placeholder="Nhập mô tả"
          />

          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            borderTop="solid 2px"
            py={2}
          >
            <button>Thêm mới</button>
          </Mui.Stack>
        </Mui.Stack>
      </Eui.EuiModal.Title>

      {/* bang du lieu */}
      <Element.LayoutTable
        button={
          <Eui.EuiButton.AddType
            name={"Thêm mới dạng đề thi"}
            onClick={func.handleOpen}
          />
        }
      >
        <Eui.EuiTable dataColumn={dataColumn}>
          {reduxTestType
            ? reduxTestType.data.map((row, i) => (
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
                    <Ex.ExIconEditDelete
                      onDelete={func.onDelete}
                      onEdit={func.onEdit}
                    />
                  </Eui.EuiTable.StyledTableCell>
                </Eui.EuiTable.StyledTableRow>
              ))
            : null}
        </Eui.EuiTable>
      </Element.LayoutTable>
    </>
  );
};

const dataColumn = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Loại đề thi",
    width: 200,
  },
  {
    name: "Mô tả",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];

const rowData = {
  data: [
    { name: "dasasd", des: "adsasd" },
    { name: "dasasd", des: "adsasd" },
  ],
};
