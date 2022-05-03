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
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const [requirements, setRequirements] = React.useState({
    input: "",
    data: [],
  });

  const [oldRequirements, setOldRequirements] = React.useState({
    input: "",
    data: [],
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Cập nhật đơn vị kiến thức thành công",
    "Đã xoá dạng đề thi, id: ",
    "Lỗi hệ thống, dạng đề này không thể xoá"
  );
  class Func {
    handleChange = (e) => {
      setData({ ...data, [e.target.name]: e.target.value });
    };
    getInfor = async () => {
      try {
        const res = await Api.unitApi.detail(id);
        console.log(res);
        setData(res);
        setOldRequirements({ ...oldRequirements, data: res.requirementData });
      } catch (error) {}
    };
    onSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await Api.unitApi.update(id, data.name, requirements.data);
        console.log(res);

        handleSnack.add("");
        handleClose();
      } catch (error) {}
    };
    onSubmitAddRequirement() {
      if (requirements.input === "") {
        return null;
      }

      let data = requirements.data;
      const datad = data.filter((item) => item.name !== requirements.input);

      datad.push({ name: requirements.input });
      setRequirements({ input: "", data: datad });
    }

    onDeleteRequirement(name) {
      const data = requirements.data;
      console.log(name);
      const datad = data.filter((item) => item.name !== name);
      console.log(datad);
      setRequirements({ ...requirements, data: datad.concat() });
    }
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
        title={"Chỉnh sửa đơn vị kiến thức"}
      >
        <Mui.Stack sx={{ overflowY: "scroll", maxHeight: 400 }}>
          <Mui.Grid
            container
            columnSpacing={2}
            component={"form"}
            onSubmit={func.onSubmit}
          >
            <Mui.Grid item xs={12}>
              <Ex.ExInputWrapper.Basic
                label={"Tên đơn vị kiến thức:"}
                name={"unitName"}
                onChange={func.handleChangeAdd}
                placeholder={"Nhập tên đơn vị kiến thức"}
                required
                value={data.name}
              />
              <Mui.Divider />
              <Ex.ExInputWrapper.Basic
                label={"Mã đơn vị kiến thức:"}
                name={"code"}
                onChange={func.handleChangeAdd}
                placeholder={"Nhập mã đơn vị kiến thức"}
                value={data.code || ""}
              />
              <Mui.Divider />
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Stack
                // onSubmit={func.onSubmitAddRequirement}

                spacing={2}
              >
                <Ex.ExInputWrapper.Basic
                  label={"Thêm yêu cầu cần đạt:"}
                  name={"requireName"}
                  placeholder={"Thêm yêu cầu cần đạt"}
                  value={requirements.input}
                  onChange={(e) =>
                    setRequirements({ ...requirements, input: e.target.value })
                  }
                  // onSubmit={func.onSubmitAddRequirement}
                />
                <Eui.EuiButton.AddType
                  name={"Thêm yêu cầu cần đạt"}
                  onClick={func.onSubmitAddRequirement}
                />

                <Eui.EuiTable dataColumn={dataColumn2}>
                  {oldRequirements.data
                    ? oldRequirements.data.map((row, i) => (
                        <Eui.EuiTable.StyledTableRow key={i}>
                          <Eui.EuiTable.StyledTableCell align="center">
                            {i + 1}
                          </Eui.EuiTable.StyledTableCell>
                          <Eui.EuiTable.StyledTableCell align="center">
                            {row.name || "name"}
                          </Eui.EuiTable.StyledTableCell>
                          <Eui.EuiTable.StyledTableCell align="center">
                            {/*<Ex.ExIconEditDelete.DeleteOnly*/}
                            {/*onDelete={() =>*/}
                            {/*  func.onDeleteRequirement(row.name)*/}
                            {/*}*/}
                            {/*/>*/}
                          </Eui.EuiTable.StyledTableCell>
                        </Eui.EuiTable.StyledTableRow>
                      ))
                    : null}
                  {requirements.data
                    ? requirements.data.map((row, i) => (
                        <Eui.EuiTable.StyledTableRow key={i}>
                          <Eui.EuiTable.StyledTableCell align="center">
                            {i + 1}
                          </Eui.EuiTable.StyledTableCell>
                          <Eui.EuiTable.StyledTableCell align="center">
                            {row.name || "name"}
                          </Eui.EuiTable.StyledTableCell>
                          <Eui.EuiTable.StyledTableCell align="center">
                            <Ex.ExIconEditDelete.DeleteOnly
                            onDelete={() =>
                              func.onDeleteRequirement(row.name)
                            }
                            />
                          </Eui.EuiTable.StyledTableCell>
                        </Eui.EuiTable.StyledTableRow>
                      ))
                    : null}
                </Eui.EuiTable>
              </Mui.Stack>
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Mui.Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                borderTop="solid 2px"
                pt={5}
              >
                <Eui.EuiButton.AddNew
                  name={"Cập nhật đơn vị kiến thức"}
                  component={"button"}
                />
              </Mui.Stack>
            </Mui.Grid>
          </Mui.Grid>
        </Mui.Stack>
      </Eui.EuiModal.Title>
    </>
  );
};

const dataColumn2 = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Yêu cầu cần đạt",
  },
  {
    name: "Xoá",
    width: 50,
  },
];
