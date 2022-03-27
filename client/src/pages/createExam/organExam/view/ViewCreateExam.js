import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
export const ViewCreateExam = ({ handleClose, handleSnack, handleError }) => {
  const [search, setSearch] = React.useState({
    examTypeId: null,
    classId: null,
    subjectId: null,
    testName: "",
    matrixID: null,
    testCode: "",
  });

  class Func {
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleSubmit = async (e) => {
      e.preventDefault();

      const data = {
        name: search.testName,
        code: search.testCode,
        testMatrixId: search.matrixID,
      };

      try {
        const res = await Api.examApi.add(data);
        console.log(res);
        handleSnack();
        handleClose();
      } catch (error) {
        handleError();
      }

      console.log(search);
    };
  }

  const func = new Func();
  return (
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
          required
        />
      </Item>
      <Item xs={12}>
        <Mui.Grid container columnSpacing={2}>
          <Item xs={6}>
            <Ex.ExDataSelect.Class onChange={func.handleChange} required />
          </Item>
          <Item xs={6}>
            <Ex.ExDataSelect.Subject
              id={search.classId}
              onChange={func.handleChange}
              required
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
            />
          </Item>
          <Item xs={6}>
            <Ex.ExDataSelect.Matrix
              id={search.subjectId}
              onChange={func.handleChange}
              required
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

          <Eui.EuiButton.Progress name={"Tạo bộ đề"} component={"button"} />
        </Mui.Stack>
      </Item>
    </Mui.Grid>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item {...rest}>
      {children}
    </Mui.Grid>
  );
};
