import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as Ex from "Example";
import { ViewQuestion } from "pages/bankQuestion/listQuetion/view";

import * as Api from "api";

import * as Class from "Class";
export const CreateExams = () => {
  const [search, setSearch] = React.useState({
    testTypeId: null,
    classId: null,
    subjectId: null,
    testName: "",
    matrixId: null,
    testCode: "",
  });

  const [questionId, setQuestionId] = React.useState(null);
  const [listQuestion, setListQuestion] = React.useState(null);

  const [open, setIsOpen] = React.useState(false);

  const [isOpenViewQuestion, setIsOpenViewQuestion] = React.useState(false);

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  // class

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage("", "", "Lỗi hệ thống, chưa thể thêm đề thi mới");

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới thời gian làm bài"
  );

  const handleOpenViewQuestion = new Class.HandlePopup(
    setIsOpenViewQuestion,
    "",
    "Thêm mới thời gian làm bài"
  );

  //   function
  class Func {
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleViewQuestion(id) {
      setQuestionId(id);
      handleOpenViewQuestion.open();
    }

    handleGen = async () => {
      if (search.matrixId === null) {
        return setListQuestion(null);
      }
      try {
        const res = await Api.examApi.gen(search.matrixId);
        setListQuestion(res);
        handleSnack.add("Đã tạo bộ câu hỏi mới");
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };

    handleOpen(e) {
      e.preventDefault();
      handleOpenNew.open();
    }

    async handleAddNew() {
      const data = {
        name: search.testName,
        code: search.testCode,
        testMatrixId: search.matrixId,
        questionIds: [],
      };

      listQuestion.forEach((item) => {
        data.questionIds.push(item.id);
      });

      console.log(data);
      try {
        const res = await Api.examApi.add(data);
        console.log(res);
        handleSnack.add("Đã tạo đề thi mới");
      } catch (err) {
        console.log(err);
      }
      handleOpenNew.close();
    }

    getNameTypeExam = (name) => {
      switch (name) {
        case "MultiChoiceQuestion":
          // code block
          return "Câu hỏi trắc nghiệm";

        default:
          // code block
          return "Câu hỏi tự luận";
      }
    };
  }

  const func = new Func();

  React.useEffect(() => {
    setListQuestion(null);
    setSearch((s) => ({ ...s, matrixId: null }));
  }, [search.subjectId]);

  React.useEffect(() => {
    setSearch((s) => ({ ...s, subjectId: null }));
  }, [search.classId]);

  React.useEffect(() => {
    func.handleGen();
  }, [search.matrixId]);

  return (
    <Views.ViewContent title={"Tạo đề thi mới"}>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      {/* popup */}
      <Ex.ExModalPoppup.Basic
        open={open}
        handleClose={() => handleOpenNew.close()}
        handleFunc={func.handleAddNew}
      />
      <Mui.Stack spacing={0.5} component={"form"} onSubmit={func.handleOpen}>
        {/* view question */}
        <Ex.ExModalPoppup.ViewQuestion
          open={isOpenViewQuestion}
          handleClose={() => handleOpenViewQuestion.close()}
        >
          <ViewQuestion id={questionId} />
        </Ex.ExModalPoppup.ViewQuestion>
        {/* nav */}
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    onChange={func.handleChange}
                    value={search.classId}
                    required
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    onChange={func.handleChange}
                    id={search.classId}
                    value={search.subjectId}
                    required
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExDataSelect.Matrix
                onChange={func.handleChange}
                id={search.subjectId}
                value={search.matrixId}
                required
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.ExamType
                onChange={func.handleChange}
                required
                value={search.testTypeId}
              />
            </Item>

            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên đề thi:"}
                name={"testName"}
                placeholder={"Nhập tên đề thi mới"}
                onChange={func.handleChange}
                required
              />
            </Item>
          </Mui.Grid>

          {/* button */}
          <Mui.Stack
            direction={"row"}
            spacing={2}
            pt={2}
            borderTop={"solid 1px"}
            borderColor={"red"}
          >
            {search.matrixId ? (
              <Eui.EuiButton.AddType
                name={"Tạo bộ câu mới"}
                onClick={func.handleGen}
              />
            ) : null}
          </Mui.Stack>
        </Views.ViewBoard>

        <Views.ViewBoard>
          <Eui.EuiTable dataColumn={dataColumn}>
            {listQuestion
              ? listQuestion.map((row, i) => (
                  <Eui.EuiTable.StyledTableRow key={i}>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {i + 1}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.code || "code"}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {row?.name || "name "}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      do kho
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      {func.getNameTypeExam(row.type)}
                    </Eui.EuiTable.StyledTableCell>
                    <Eui.EuiTable.StyledTableCell align="center">
                      <Ex.ExIconEditDelete.ViewOnly
                        onView={() => func.handleViewQuestion(row.id)}
                      />
                    </Eui.EuiTable.StyledTableCell>
                  </Eui.EuiTable.StyledTableRow>
                ))
              : null}
          </Eui.EuiTable>
          {/* <Eui.EuiPagination
            count={pages.total}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
            size={"large"}
            shape={"rounded"}
            onChange={func.handlePagination}
          /> */}
        </Views.ViewBoard>
        <Views.ViewBoard>
          <Mui.Stack spacing={3}>
            <Eui.EuiButton.OpenCreate component={"button"} />
            {/* <Eui.EuiButton.Progress
              name={"Tao moi"}
              onClick={func.handleOpen}
            /> */}
          </Mui.Stack>
        </Views.ViewBoard>
      </Mui.Stack>
    </Views.ViewContent>
  );
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} lg={6}>
      {children}
    </Mui.Grid>
  );
};

const dataColumn = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Mã câu hỏi",
    width: 100,
  },

  {
    name: "Tên câu hỏi",
    width: 300,
  },
  {
    name: "Độ khó",
    width: 200,
  },
  {
    name: "Loại câu",
    width: 200,
  },
  {
    name: "Chi tiết",
    width: 70,
  },
];
