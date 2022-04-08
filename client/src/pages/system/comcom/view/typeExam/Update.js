import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Api from "api";
import * as Class from "Class";
export const Update = ({ open, handleClose, id }) => {
  const [data, setData] = React.useState({
    typeExam: "",
    des: "",
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Cập nhật dạng đề thi thành công",
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
        const res = await Api.testTypeApi.detail(id);
        console.log(res);
        setData({
          typeExam: res.name,
          des: res.description,
        });
      } catch (error) {}
    };
    onSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await Api.testTypeApi.update(id, data.typeExam, data.des);
        console.log(res);

        handleSnack.add("");
        handleClose();
      } catch (error) {}
    };
  }

  const func = new Func();

  React.useEffect(() => {
    func.getInfor();
  }, [id]);
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
        title={"Chỉnh sửa loại đề thi"}
      >
        <Mui.Stack spacing={2} component={"form"} onSubmit={func.onSubmit}>
          <Ex.ExInputWrapper.Basic
            label={"Loại đề thi"}
            name={"typeExam"}
            onChange={func.handleChange}
            required
            placeholder="Nhập loại đề thi"
            value={data.typeExam}
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
              name={"Cập nhật dạng đề"}
              component={"button"}
            />
          </Mui.Stack>
        </Mui.Stack>
      </Eui.EuiModal.Title>
    </>
  );
};
