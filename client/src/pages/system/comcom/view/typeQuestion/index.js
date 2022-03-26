import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Element from "../../element";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";

export const TypeQuestion = () => {
  // redux
  const reduxQuestionType = useSelector((state) => state.reduxQuestionType);
  const [open, setIsOpen] = React.useState(false);

  const [data, setData] = React.useState({
    TypeQuestion: "",
    des: "",
  });

  const dispatch = useDispatch();

  const [deleteState, setDeleteState] = React.useState({
    id: null,
    open: false,
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  class Func {
    constructor() {
      this.message = {
        delete: "da xoa dang de, id:",
        null: "chua nhap ten dang de",
        add: "da them dang de, id: ",
      };
    }

    handleSearch = () => {
      Function.handler
        .api(() => Api.testTypeApi.search())
        .then((res) => {
          console.log(res);
          dispatch(Slide.TestTypeSlide.setTestType(res));
        })
        .catch((error) => console.log(error));
    };

    handleCloseSnack = () => {
      setSnack({ ...snack, isOpen: false });
    };

    handleCloseDelete = () => {
      setDeleteState({ id: null, open: false });
    };

    handleOpenDelete = (id) => {
      setDeleteState({ id: id, open: true });
    };

    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    };
    onSubmit = (e) => {
      e.preventDefault();
      Function.handler
        .api(() => Api.questionTypeApi.add(data.TypeQuestion, data.des))
        .then((res) => {
          setSnack({
            isOpen: true,
            message: this.message.add + " " + res.id,
            severity: null,
          });
          this.handleClose();
          this.handleSearch()
        })
        .catch((error) => console.log(error));
      console.log("submit");
    };
    onDelete = () => {
      Function.handler
        .api(() => Api.questionTypeApi.delete(deleteState.id))
        .then((res) => {
          setSnack({
            isOpen: true,
            message: this.message.delete + " " + res.id,
            severity: "warning",
          });
        })
        .catch((error) =>
          setSnack({
            isOpen: true,
            message: this.message.null,
            severity: "warning",
          })
        );

      this.handleCloseDelete();
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

  React.useEffect(() => {
    func.handleSearch();
  }, [snack]);
  return (
    <>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={func.handleCloseSnack}
        message={snack.message}
        severity={snack.severity}
      />

      {/* modal delete */}
      <Eui.EuiModal.Title
        open={deleteState.open}
        handleClose={func.handleCloseDelete}
        w={"80%"}
        mw={300}
        title={"Xác nhận xoá?"}
      >
        <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
          <Eui.EuiButton.Cancel onClick={func.handleCloseDelete} />
          <Eui.EuiButton.Progress name={"Xoá"} onClick={func.onDelete} />
        </Mui.Stack>
      </Eui.EuiModal.Title>
      {/* modal */}
      <Eui.EuiModal.Title
        open={open}
        handleClose={func.handleClose}
        w={"80%"}
        mw={400}
        title={"Thêm mới loại câu hỏi"}
      >
        <Mui.Stack spacing={2} component={"form"} onSubmit={func.onSubmit}>
          <Ex.ExInputWrapper.Basic
            label={"Loại câu hỏi"}
            name={"TypeQuestion"}
            required
            placeholder="Nhập loại câu hỏi"
            onChange={func.handleChange}
          />
          <Ex.ExInputWrapper.Multiline
            label={"Mô tả"}
            name={"des"}
            placeholder="Nhập mô tả"
            onChange={func.handleChange}
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
            name={"Thêm mới loại câu hỏi"}
            onClick={func.handleOpen}
          />
        }
      >
        <Eui.EuiTable dataColumn={dataColumn}>
          {reduxQuestionType
            ? reduxQuestionType?.data.map((row, i) => (
                <Eui.EuiTable.StyledTableRow key={i}>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {i + 1}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {row.name || "code"}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {row.description || ""}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    <Ex.ExIconEditDelete
                      onDelete={() => func.handleOpenDelete(row.id)}
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
    name: "Loại câu hỏi",
    width: 200,
  },
  {
    name: "Mô tả",
    width: 200,
  },
  {
    name: "Tha tác",
    width: 200,
  },
];

const rowData = {
  data: [
    { name: "dasasd", des: "adsasd" },
    { name: "dasasd", des: "adsasd" },
  ],
};
