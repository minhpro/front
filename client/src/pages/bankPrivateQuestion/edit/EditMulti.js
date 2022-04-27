import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";

export const EditMulti = ({ data }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState({
    chapterId: null,
    classId: null,
    subjectId: null,
    unitId: null,
    typeQuestionId: data.questionTypeData.id,
    questionName: data.name,
    timeAnswer: data.time,
    requirementId: data.requirementData?.id,
    classification: data.classification,
    targets: data.targets,
    bank: "EDB",
  });

  const [question, setQuestion] = React.useState({
    question: data.question,
    suggest: data.suggest,
    answer: data.answer,
    answerOne: data.answerOne,
    answerTwo: data.answerTwo,
    answerThree: data.answerThree,
    answerFour: data.answerFour,
  });

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới loại câu hỏi"
  );

  //   function
  class Func {
    constructor() {
      this.message = {
        delete: "da xoa dang de, id:",
        null: "chua nhap ten dang de",
        add: "da them dang de, id: ",
      };
    }
    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleChangeQuestion = (name, e) => {
      setSearch({ ...search, [name]: e });
      console.log(search);
    };

    onSubmit = (e) => {
      e.preventDefault();
      let body = {
        id: data.id,
        name: search.questionName,
        question: question.question,
        suggest: question.suggest,
        time: search.timeAnswer,
        questionTypeId: search.typeQuestionId,
        unitId: search.unitId,
        type: "MultiChoice",
        requirementId: search.requirementId,
        classification: search.classification,
        targets: search.targets,
        answer: question.answer,
        answerOne: question.answerOne,
        answerTwo: question.answerTwo,
        answerThree: question.answerThree,
        answerFour: question.answerFour,
      };
      console.log(body);
      Function.handler
        .api(() => Api.questionApi.update(body))
        .then((res) => {
          console.log(res);
          handleSnack.add("");
        })
        .catch((error) => console.log(error));
      handleOpenNew.close();
      console.log("submit");
    };

    handleOpen = (e) => {
      e.preventDefault();
      setIsOpen(true);
    };
  }

  const func = new Func();

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã cập nhật câu hỏi ",
    "Đã xoá loại câu hỏi, id: ",
    "Lỗi hệ thống, không thể xoá"
  );

  return (
    <>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      {/* create */}
      <Ex.ExModalPoppup.Create
        open={isOpen}
        handleClose={() => handleOpenNew.close()}
        handleCreate={func.onSubmit}
      />
      <Mui.Stack spacing={0.5} component={"form"} onSubmit={func.handleOpen}>
        {/* tim kiem */}
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên câu hỏi"}
                name={"questionName"}
                required
                onChange={func.handleChange}
                placeholder={"Nhập tên câu hỏi"}
                value={search.questionName}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    required
                    // onChange={func.handleChange}
                    value={
                      data.requirementData.unitData.chapterData.subjectData
                        .classs.id
                    }
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    required
                    id={
                      data.requirementData.unitData.chapterData.subjectData
                        .classs.id
                    }
                    // onChange={func.handleChange}
                    value={
                      data.requirementData.unitData.chapterData.subjectData.id
                    }
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExDataSelect.Chapter
                required
                id={data.requirementData.unitData.chapterData.subjectData.id}
                // onChange={func.handleChange}
                value={data.requirementData.unitData.chapterData.id}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Units
                    required
                    id={data.requirementData.unitData.chapterData.id}
                    // onChange={func.handleChange}
                    value={data.requirementData.unitData.id}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Require
                    required
                    id={data.requirementData.unitData.id}
                    // onChange={func.handleChange}
                    value={search.requirementId}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>

            <Item>
              <Ex.ExDataSelect.TypeQuestion
                required
                onChange={func.handleChange}
                value={search.typeQuestionId}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.MultiSelect
                label={"Mục tiêu ma trận:"}
                onChange={(e) => setSearch({ ...search, targets: e })}
                defaultValue={search.targets}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Classify
                required
                onChange={func.handleChange}
                value={search.classification}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExInputWrapper.Basic
                    label={"Thời gian trả lời"}
                    name={"timeAnswer"}
                    type={"number"}
                    required
                    onChange={func.handleChange}
                    value={search.timeAnswer}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.TimeType
                    label={"Loại thời gian"}
                    onChange={func.handleChange}
                    required
                    defaultValue={1}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
          </Mui.Grid>
        </Views.ViewBoard>
        {/* noi dung cau hoi */}
        <Views.ViewBoard>
          <Mui.Stack spacing={1}>
            <Ex.ExInputWrapper.Editor
              label={"Câu hỏi:"}
              name={"ads"}
              placeholder="Nhập câu hỏi tại đây..."
              onChange={(e) => setQuestion((pre) => ({ ...pre, question: e }))}
              required
              defaultValue={question.question}
            />
            <Ex.ExInputWrapper.Editor
              label={"Hướng dẫn giải:"}
              name={"ads"}
              placeholder="Nhập hướng dẫn giải tại đây..."
              onChange={(e) => setQuestion((pre) => ({ ...pre, suggest: e }))}
              defaultValue={question.suggest}
            />
            <Ex.ExInputWrapper.Editor
              label={"Đáp án A:"}
              name={"ads"}
              placeholder="Nhập đáp án A tại đây..."
              onChange={(e) => setQuestion((pre) => ({ ...pre, answerOne: e }))}
              defaultValue={question.answerOne}
            />
            <Ex.ExInputWrapper.Editor
              label={"Đáp án B:"}
              name={"ads"}
              placeholder="Nhập đáp án B tại đây..."
              onChange={(e) => setQuestion((pre) => ({ ...pre, answerTwo: e }))}
              defaultValue={question.answerTwo}
            />
            <Ex.ExInputWrapper.Editor
              label={"Đáp án C:"}
              name={"ads"}
              placeholder="Nhập đáp án C tại đây..."
              onChange={(e) =>
                setQuestion((pre) => ({ ...pre, answerThree: e }))
              }
              defaultValue={question.answerThree}
            />
            <Ex.ExInputWrapper.Editor
              label={"Đáp án D:"}
              name={"ads"}
              placeholder="Nhập đáp án D tại đây..."
              onChange={(e) =>
                setQuestion((pre) => ({ ...pre, answerFour: e }))
              }
              defaultValue={question.answerFour}
            />
            <Mui.Stack>
              <Mui.FormControl>
                <Mui.RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      answer: parseInt(e.target.value),
                    });
                    console.log(question);
                  }}
                  value={question.answer}
                >
                  <Mui.FormControlLabel
                    value={0}
                    control={
                      <Mui.Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={<p>Đáp án A</p>}
                  />
                  <Mui.FormControlLabel
                    value={1}
                    control={
                      <Mui.Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={<p>Đáp án B</p>}
                  />
                  <Mui.FormControlLabel
                    value={2}
                    control={
                      <Mui.Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={<p>Đáp án C</p>}
                  />
                  <Mui.FormControlLabel
                    value={3}
                    control={
                      <Mui.Radio
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 28,
                          },
                        }}
                      />
                    }
                    label={<p>Đáp án D</p>}
                  />
                </Mui.RadioGroup>
              </Mui.FormControl>
            </Mui.Stack>
            <Mui.Stack>
              <Eui.EuiButton.AddNew name={"Cập nhật"} component={"button"} />
            </Mui.Stack>
          </Mui.Stack>
        </Views.ViewBoard>
      </Mui.Stack>
    </>
  );
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} xl={6}>
      {children}
    </Mui.Grid>
  );
};
