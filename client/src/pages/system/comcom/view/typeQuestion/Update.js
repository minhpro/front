import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Api from "api";
import * as Class from "Class";
export const Update = ({ open, handleClose, id }) => {
  const [data, setData] = React.useState({
    name: "",
    code: "",
    des: "",
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Cập nhật loại câu hỏi thành công",
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
        const res = await Api.questionTypeApi.detail(id);
        console.log(res);
        setData({
          name: res.name,
          code: res.code,
          des: res.description,
        });
      } catch (error) {}
    };
    onSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await Api.questionTypeApi.update(
          id,
          data.name,
          data.des,
          data.code
        );
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
        title={"Chỉnh sửa loại câu hỏi"}
      >
        <Mui.Stack spacing={2} component={"form"} onSubmit={func.onSubmit}>
          <Ex.ExInputWrapper.Basic
            label={"Loại câu hỏi"}
            name={"name"}
            onChange={func.handleChange}
            required
            placeholder="Nhập loại câu hỏi"
            value={data.name}
          />
          <Ex.ExInputWrapper.Basic
            label={"Mã câu hỏi"}
            name={"code"}
            onChange={func.handleChange}
            required
            placeholder="Nhập mã câu hỏi"
            value={data.code}
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
            <Eui.EuiButton.Cancel onClick={handleClose} />

            <Eui.EuiButton.AddNew
              name={"Cập nhật loại câu hỏi"}
              component={"button"}
            />
          </Mui.Stack>
        </Mui.Stack>
      </Eui.EuiModal.Title>
    </>
  );
};
