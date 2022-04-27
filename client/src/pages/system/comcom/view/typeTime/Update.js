import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Api from "api";
import * as Class from "Class";
import * as Co from "components";
export const Update = ({ open, handleClose, id }) => {
  const [data, setData] = React.useState({
    timeType: "",
    des: "",
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Cập nhật thời gian thành công",
    "Đã xoá dạng đề thi, id: ",
    "Lỗi hệ thống, dạng đề này không thể xoá"
  );
  class Func {
    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    getInfor = async () => {
      console.log(data);
      try {
        const res = await Api.testTimeApi.detail(id);
        console.log(res);
        setData({
          timeType: res.time,
          des: res.description,
        });
      } catch (error) {}
    };
    onSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await Api.testTimeApi.update(id, data.timeType, data.des);
        console.log(res);

        handleSnack.add("");
        handleClose();
      } catch (error) {}
    };
  }

  const func = new Func();

  React.useLayoutEffect(() => {
    func.getInfor();
  }, [id]);

  function handleSetTime(time) {
    console.log(time);
    setData({ ...data, timeType: time });
  }
  return (
    <>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      <Eui.EuiModal.Title
        open={open}
        handleClose={handleClose}
        w={"80%"}
        mw={400}
        title={"Chỉnh sửa thời gian làm bài"}
      >
        <Mui.Stack spacing={2} component={"form"} onSubmit={func.onSubmit}>
          {/* <Ex.ExInputWrapper.Basic
            label={"Thời gian làm bài"}
            name={"timeType"}
            onChange={func.handleChange}
            required
            type={"number"}
            placeholder="Nhập thời gian"
            value={data.timeType}
          /> */}
          <Co.Time.TimeWrapper
            setTime={handleSetTime}
            preTime={data.timeType}
          />
          <Ex.ExInputWrapper.Multiline
            label={"Mô tả"}
            name={"des"}
            onChange={func.handleChange}
            placeholder="Nhập mô tả"
            value={data.des}
          />

          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            borderTop="solid 2px"
            py={2}
          >
            <Eui.EuiButton.AddNew
              name={"Cập nhật thời gian"}
              component={"button"}
            />
          </Mui.Stack>
        </Mui.Stack>
      </Eui.EuiModal.Title>
    </>
  );
};
