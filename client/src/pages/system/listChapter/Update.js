import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Api from "api";
import * as Class from "Class";
export const Update = ({ open, handleClose, id }) => {
  const [data, setData] = React.useState({
    name: "",
    code: null,
    unitData: [],
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Cập nhật chủ đề thành công",
    "Đã xoá dạng đề thi, id: ",
    "Lỗi hệ thống, dạng đề này không thể xoá"
  );
  class Func {
    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    getInfor = async () => {
      try {
        const res = await Api.chapterApi.detail(id);
        console.log(res);
        setData(res);
      } catch (error) {}
    };
    onSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await Api.chapterApi.update(id, data.name);
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
        title={"Chỉnh sửa chủ đề"}
      >
        <Mui.Stack spacing={2} component={"form"} onSubmit={func.onSubmit}>
          <Ex.ExInputWrapper.Basic
            label={"Tên chủ đề"}
            name={"name"}
            onChange={func.handleChange}
            required
            placeholder="Nhập tên chủ đề"
            value={data.name}
          />
          <Ex.ExInputWrapper.Basic
            label={"Mã chủ đề"}
            name={"code"}
            onChange={func.handleChange}
            placeholder="Nhập mã chủ đề"
            value={data.code}
            disabled
          />

          <Mui.Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            borderTop="solid 2px"
            py={2}
          >
            <Eui.EuiButton.AddNew
              name={"Cập nhật chủ đề"}
              component={"button"}
            />
          </Mui.Stack>
        </Mui.Stack>
      </Eui.EuiModal.Title>
    </>
  );
};
