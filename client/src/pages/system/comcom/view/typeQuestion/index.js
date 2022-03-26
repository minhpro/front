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
import * as Class from "Class";
export const TypeQuestion = () => {
  // redux
  const reduxQuestionType = useSelector((state) => state.reduxQuestionType);

  const [data, setData] = React.useState({
    TypeQuestion: "",
    des: "",
  });

  const dispatch = useDispatch();
  const [open, setIsOpen] = React.useState(false);
  const [isDeteteOpen, setIsDeleteOpen] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState(null);
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  // class

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm loại câu hỏi mới, id: ",
    "Đã xoá loại câu hỏi, id: ",
    "Lỗi hệ thống, không thể xoá"
  );

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới loại câu hỏi"
  );

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );

  //  func

  class Func {
    openDelete(id) {
      handleOpenDelete.open();
      setDeleteId(id);
    }

    update = () => {
      Function.handler
        .api(() => Api.questionTypeApi.search())
        .then((res) => {
          dispatch(Slide.QuestionTypeSilde.setQuestionType(res));
        })
        .catch((error) => console.log(error));
    };

    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    };
    onSubmit = (e) => {
      e.preventDefault();
      Function.handler
        .api(() => Api.questionTypeApi.add(data.TypeQuestion))
        .then((res) => {
          handleSnack.add(res.id);
          handleOpenNew.close();
        })
        .catch((error) => console.log(error));
      handleOpenDelete.close();
    };
    onDelete = () => {
      Function.handler
        .api(() => Api.questionTypeApi.delete(deleteId))
        .then((res) => {
          handleSnack.delete(res.id);
        })
        .catch((error) => handleSnack.error());

      handleOpenDelete.close();
    };
  }

  const func = new Func();

  React.useEffect(() => {
    func.update();
  }, [snack]);
  return (
    <>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />

      {/* modal delete */}
      <Eui.EuiModal.Title
        open={isDeteteOpen}
        handleClose={() => handleOpenDelete.close()}
        w={"80%"}
        mw={300}
        title={"Xác nhận xoá?"}
      >
        <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
          <Eui.EuiButton.Cancel onClick={() => handleOpenDelete.close()} />
          <Eui.EuiButton.Progress name={"Xoá"} onClick={func.onDelete} />
        </Mui.Stack>
      </Eui.EuiModal.Title>
      {/* modal */}
      <Eui.EuiModal.Title
        open={open}
        handleClose={() => handleOpenNew.close()}
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
            onClick={() => handleOpenNew.open()}
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
                    {row.des || "name class"}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    <Ex.ExIconEditDelete
                      onDelete={() => func.openDelete(row.id)}
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
    name: "Thao tác",
    width: 200,
  },
];
