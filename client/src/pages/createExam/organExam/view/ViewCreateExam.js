import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Api from "api";
import * as Class from "Class";
export const ViewCreateExam = ({ handleClose, handleSnack, handleError }) => {
  const [search, setSearch] = React.useState({
    examTypeId: null,
    classId: null,
    subjectId: null,
    testName: "",
    matrixId: null,
    testCode: "",
  });
  const [isView, setIsView] = React.useState(false);

  const handleOpenView = new Class.HandlePopup(setIsView, "", "Chi tiees ");

  class Func {
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleSubmit = async (e) => {
      e.preventDefault();

      handleOpenView.open();
      // const data = {
      //   name: search.testName,
      //   code: search.testCode,
      //   testMatrixId: search.matrixID,
      // };

      // try {
      //   const res = await Api.examApi.add(data);
      //   console.log(res);
      //   handleSnack();
      //   handleClose();
      // } catch (error) {
      //   handleError();
      // }

      console.log(search);
    };
  }

  const func = new Func();

  React.useEffect(() => {
    setSearch({ ...search, subjectId: null });
  }, [search.classId]);

  React.useEffect(() => {
    setSearch({ ...search, matrixId: null });
  }, [search.subjectId]);
  return (
    <Mui.Stack>
      <Mui.Grid
        container
        rowSpacing={2}
        component={"form"}
        onSubmit={func.handleSubmit}
      >
        <Item xs={12}>
          <Ex.ExInputWrapper.Basic
            label={"Tên đề thi:"}
            name={"testName"}
            onChange={func.handleChange}
            placeholder={"Nhập tên đề thi mới:"}
            required
            value={search.testName}
          />
        </Item>
        <Item xs={12}>
          <Mui.Grid container columnSpacing={2}>
            <Item xs={6}>
              <Ex.ExDataSelect.Class
                onChange={func.handleChange}
                required
                value={search.classId}
              />
            </Item>
            <Item xs={6}>
              <Ex.ExDataSelect.Subject
                id={search.classId}
                onChange={func.handleChange}
                required
                value={search.subjectId}
              />
            </Item>
          </Mui.Grid>
        </Item>

        <Item xs={12}>
          <Mui.Grid container columnSpacing={2}>
            <Item xs={6}>
              <Ex.ExInputWrapper.Basic
                label={"Mã đề thi:"}
                name={"testCode"}
                onChange={func.handleChange}
                required
                value={search.testCode}
                placeholder={"Nhập mã đề thi:"}
              />
            </Item>
            <Item xs={6}>
              <Ex.ExDataSelect.Matrix
                id={search.subjectId}
                onChange={func.handleChange}
                required
                value={search.matrixId}
              />
            </Item>
          </Mui.Grid>
        </Item>
        <Item xs={12}>
          <Mui.Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={5}
          >
            <Eui.EuiButton.Cancel onClick={() => handleClose()} />

            <Eui.EuiButton.AddNew
              name={"Tạo bộ câu hỏi"}
              component={"button"}
            />
          </Mui.Stack>
        </Item>
      </Mui.Grid>
    </Mui.Stack>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item {...rest}>
      {children}
    </Mui.Grid>
  );
};
