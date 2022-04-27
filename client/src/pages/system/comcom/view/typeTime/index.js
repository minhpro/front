import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Element from "../../element";
import { Update } from "./Update";
import * as Function from "functions";
import * as Api from "api";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
import * as Class from "Class";
import * as Co from "components";
import * as Utils from "utils";

export const TypeTime = () => {
  const dispatch = useDispatch();

  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 1,
    limit: 32,
  });

  // state

  const [data, setData] = React.useState({
    timeType: "",
    des: "",
  });

  const [open, setIsOpen] = React.useState(false);
  const [isDeteteOpen, setIsDeleteOpen] = React.useState(false);

  const [deleteId, setDeleteId] = React.useState(null);
  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  // class

  const [isOpenUpdate, setIsOpenUpdate] = React.useState(false);

  const handleOpenUpdate = new Class.HandlePopup(setIsOpenUpdate);

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm thời gian làm bài mới, id: ",
    "Đã xoá thời gian làm bài, id: ",
    "Lỗi hệ thống, không thể xoá",
    "Chưa nhập thời gian"
  );

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới thời gian làm bài"
  );

  const handleOpenDelete = new Class.HandlePopup(
    setIsDeleteOpen,
    "",
    "Xác nhận xoá?"
  );

  function handleSetTime(time) {
    console.log(time);
    setData({ ...data, timeType: time });
  }

  // function
  class Func {
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }
    getTotalPage(total) {
      const number = total / pages.limit + 1;

      return parseInt(number);
    }
    update = () => {
      Function.handler
        .api(() => Api.testTimeApi.search(null, pages.page, pages.limit))
        .then((res) => {
          console.log(res);
          setPages({
            ...pages,
            total: this.getTotalPage(res.total),
            data: res.data,
          });
          dispatch(Slide.TimeExamSlide.setTimeExam(res));
        })
        .catch((error) => console.log(error));
    };

    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    };

    onSubmit = async (e) => {
      e.preventDefault();

      if (data.timeType <= 0) {
        return handleSnack.custom();
      }
      try {
        const res = await Api.testTimeApi.add(data.timeType, data.des);
        handleSnack.add(res.id);
        handleOpenNew.close();
      } catch (error) {
        console.log(error);
      }
    };
    onDelete = () => {
      Function.handler
        .api(() => Api.testTimeApi.delete(deleteId))
        .then((res) => {
          handleSnack.delete(res.id);
        })
        .catch((error) => handleSnack.error());

      handleOpenDelete.close();
    };

    convertSecondToTimeWithUnit(value) {
      if (value % 3600 === 0) {
        return value / 3600 + " giờ";
      } else if (value % 60 === 0) {
        return value / 60 + " phút";
      } else {
        return value + " giây";
      }
    }
    onEdit(id) {
      setDeleteId(id);
      handleOpenUpdate.open();
    }
  }

  const func = new Func();

  React.useEffect(() => {
    func.update();
  }, [snack, pages.page, isOpenUpdate]);
  return (
    <>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />

      {/* modal update */}
      <Update
        open={isOpenUpdate}
        handleClose={() => handleOpenUpdate.close()}
        id={deleteId}
      />
      {/* modal */}

      {/* chinh sua  */}
      <Co.Modal.BasicModal.Title
        title={handleOpenNew.title}
        open={open}
        handleClose={() => handleOpenNew.close()}
      >
        <Mui.Stack>
          <Co.Time.TimeWrapper setTime={handleSetTime} />
          <Ex.ExInputWrapper.Multiline
            name={"des"}
            label={"Mô tả"}
            onChange={func.handleChange}
            placeholder="Nhập mô tả"
          />
        </Mui.Stack>
        <Mui.Stack direction={"row"} justifyContent={"center"} pt={5}>
          <Eui.EuiButton.Cancel onClick={() => setIsOpen(false)} />
          <Co.Button.Basic.Update
            name={"Lưu cấu hình"}
            onClick={func.onSubmit}
          />
        </Mui.Stack>
      </Co.Modal.BasicModal.Title>

      {/* modal delete */}
      <Eui.EuiModal.Title
        open={isDeteteOpen}
        handleClose={() => handleOpenDelete.close()}
        w={"80%"}
        mw={300}
        title={handleOpenDelete.title}
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
            name={"Thêm mới thời gian làm bài"}
            onClick={() => handleOpenNew.open()}
          />
        }
      >
        <Eui.EuiTable dataColumn={dataColumn}>
          {pages.data
            ? pages.data.map((row, i) => (
                <Eui.EuiTable.StyledTableRow key={i}>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {i + 1}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {new Utils.SecondFormat(row.time).getString()}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    {row.description || ""}
                  </Eui.EuiTable.StyledTableCell>
                  <Eui.EuiTable.StyledTableCell align="center">
                    <Ex.ExIconEditDelete
                      onDelete={() => {
                        setDeleteId(row.id);
                        handleOpenDelete.open();
                      }}
                      onEdit={() => func.onEdit(row.id)}
                    />
                  </Eui.EuiTable.StyledTableCell>
                </Eui.EuiTable.StyledTableRow>
              ))
            : null}
        </Eui.EuiTable>

        <Eui.EuiPagination
          count={pages.total}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={2}
          size={"large"}
          shape={"rounded"}
          onChange={func.handlePagination}
        />
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
    name: "Thời gian",
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
