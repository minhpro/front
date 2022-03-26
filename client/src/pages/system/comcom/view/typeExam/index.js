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
import { styled } from "@mui/material/styles";
import { paginationClasses } from "@mui/material";

export const TypeExam = () => {
  // redux
  const reduxTestType = useSelector((state) => state.reduxTestType);
  const [open, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [deleteState, setDeleteState] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState(null);

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const [data, setData] = React.useState({
    typeExam: "",
    des: "",
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm dạng đề thi mới, id: ",
    "Đã xoá dạng đề thi, id: ",
    "Lỗi hệ thống, dạng đề này không thể xoá"
  );

  const handleOpenNew = new Class.HandlePopup(setIsOpen);

  const handleOpenDelete = new Class.HandlePopup(setDeleteState);

  class Func {
    update = () => {
      Function.handler
        .api(() => Api.testTypeApi.search())
        .then((res) => {
          dispatch(Slide.TestTypeSlide.setTestType(res));
        })
        .catch((error) => console.log(error));
    };

    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
      e.preventDefault();
      Function.handler
        .api(() => Api.testTypeApi.add(data.typeExam))
        .then((res) => {
          handleSnack.add(res.id);
          handleOpenNew.close();
        })
        .catch((error) => console.log(error));
    };
    onDelete = () => {
      Function.handler
        .api(() => Api.testTypeApi.delete(deleteId))
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
      {/* modal add */}
      <Eui.EuiModal.Title
        open={open}
        handleClose={() => handleOpenNew.close()}
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

      {/* modal delete */}
      <Eui.EuiModal.Title
        open={deleteState}
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

      {/* bang du lieu */}
      <Element.LayoutTable
        button={
          <Eui.EuiButton.AddType
            name={"Thêm mới dạng đề thi"}
            onClick={() => handleOpenNew.open()}
          />
        }
      >
        <Eui.EuiTable dataColumn={dataColumn}>
          {reduxTestType
            ? reduxTestType?.data.map((row, i) => (
                <Eui.EuiTable.StyledTableRow key={i}>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {i + 1}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {row.name || "name"}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {row.des || "mo ta"}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    <Ex.ExIconEditDelete
                      onDelete={() => {
                        setDeleteId(row.id);
                        handleOpenDelete.open();
                      }}
                      onEdit={func.onEdit}
                    />
                  </Eui.EuiTable.StyledTableCell>
                </Eui.EuiTable.StyledTableRow>
              ))
            : null}
        </Eui.EuiTable>
        <Mui.Stack>
          <Hu
            count={11}
            defaultPage={6}
            siblingCount={0}
            boundaryCount={2}
            size={"large"}
            shape={"rounded"}
            // renderItem={(item) => <div>asddsa</div>}
          />
        </Mui.Stack>
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

const Hu = styled(Mui.Pagination)`
  .MuiButtonBase-root {
    color: red;
    font-size: 20;
  }
  .MuiButtonBase-root {
    font-size: 20;
  }
  &.MuiPaginationItem-root {
    font-size: 20;
  }
`;
