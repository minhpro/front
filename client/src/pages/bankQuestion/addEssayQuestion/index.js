import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Co from "components";
import * as Function from "functions";
import * as Api from "api";

export const AddEssayQuestion = () => {
  const [open, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState({
    chapterId: null,
    classId: null,
    subjectId: null,
    unitId: null,
    typeQuestionId: null,
    questionName: "",
    timeAnswer: 1,
    requirementId: null,
    classification: "THEORY",
    targets: [],
    bank: "EDB",
  });

  const [searchCode, setSearchCode] = React.useState({
    chapterCode: "",
    classCode: "",
    subjectCode: "",
    unitCode: "",
    typeQuestionCode: "",
    questionCode: "",
    requirementCode: "",
    classification: "",
    targetCodes: "",
    bank: "EDB",
  });

  const [question, setQuestion] = React.useState({
    question: "",
    suggest: "",
    answer: "",
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

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

    handleCodeChange = (data) => {
      setSearchCode({ ...searchCode, [data.key]: data.value });
      console.log(searchCode);
    };

    handleChangeQuestion = (name, e) => {
      setSearch({ ...search, [name]: e });
      console.log(search);
    };

    onSubmit = () => {
      let data = {
        name: search.questionName,
        question: question.question,
        suggest: question.suggest,
        time: search.timeAnswer,
        questionTypeId: search.typeQuestionId,
        unitId: search.unitId,
        type: "ConstructedResponse",
        answer: question.answer,
        requirementId: search.requirementId,
        classification: search.classification,
        targets: search.targets,
      };
      console.log(data);
      Function.handler
        .api(() => Api.questionApi.add(data))
        .then((res) => {
          console.log(res);
          setSnack({
            isOpen: true,
            message: "da them cau hoi",
            severity: null,
          });
        })
        .catch((error) => console.log(error));

      this.handleClose();
      console.log("submit");
    };
    onDelete = () => {
      console.log("submit");
    };

    onEdit = (e) => {
      console.log("submit");
    };

    handleClose = () => {
      setIsOpen(false);
    };
    handleOpen = (e) => {
      e.preventDefault();
      setIsOpen(true);
    };
    handleCloseSnack = () => {
      setSnack({
        isOpen: false,
        message: null,
        severity: null,
      });
    };
  }

  const func = new Func();
  function resets(name) {
    setSearch({ ...search, [name]: null });
  }

  React.useEffect(() => {
    resets("subjectId");
  }, [search.classId]);

  React.useEffect(() => {
    resets("chapterId");
  }, [search.subjectId]);

  React.useEffect(() => {
    resets("unitId");
  }, [search.chapterId]);

  React.useEffect(() => {
    resets("requirementId");
  }, [search.unitId]);

  return (
    <Views.ViewContent title={"Thêm mới câu hỏi tự luận EBD"}>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={func.handleCloseSnack}
        message={snack.message}
        severity={snack.severity}
      />
      {/* create */}
      <Ex.ExModalPoppup.Create
        open={open}
        handleClose={func.handleClose}
        handleCreate={func.onSubmit}
      />
      <Mui.Stack spacing={0.5} component={"form"} onSubmit={func.handleOpen}>
        {/* tim kiem */}
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Mui.Grid item xs={12}>
              <Ex.ExDataSelect.Class2
                required
                onChange={func.handleChange}
                onCodeChange={func.handleCodeChange}
                value={search.classId || ""}
              />
            </Mui.Grid>
            <Mui.Grid item xs={12}>
              <Ex.ExDataSelect.Subject2
                required
                id={search.classId}
                onChange={func.handleChange}
                onCodeChange={func.handleCodeChange}
                value={search.subjectId || ""}
              />
            </Mui.Grid>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên câu hỏi"}
                name={"questionName"}
                required
                onChange={func.handleChange}
                placeholder={"Nhập tên câu hỏi"}
              />
            </Item>
            {/* <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    required
                    onChange={func.handleChange}
                    onCodeChange={func.handleCodeChange}
                    value={search.classId || ""}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    required
                    id={search.classId}
                    onChange={func.handleChange}
                    onCodeChange={func.handleCodeChange}
                    value={search.subjectId || ""}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item> */}
            <Item>
              <Ex.ExDataSelect.Chapter
                required
                id={search.subjectId}
                onChange={func.handleChange}
                onCodeChange={func.handleCodeChange}
                value={search.chapterId || ""}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Units
                    required
                    id={search.chapterId}
                    onChange={func.handleChange}
                    onCodeChange={func.handleCodeChange}
                    value={search.unitId || ""}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Require
                    required
                    id={search.unitId}
                    onChange={func.handleChange}
                    onCodeChange={func.handleCodeChange}
                    value={search.requirementId || ""}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>

            <Item>
              <Ex.ExDataSelect.TypeQuestion
                required
                onChange={func.handleChange}
                onCodeChange={func.handleCodeChange}
                value={search.typeQuestionId || ""}
              />
            </Item>
            <Item>
              <Ex.ExInputWrapper.MultiSelect
                label={"Mục tiêu ma trận:"}
                onChange={(e) => setSearch({ ...search, targets: e })}
                onCodeChange={func.handleCodeChange}
                defaultValue={["ONLINE_REVIEW"]}
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
              <Co.Time.TimeWrapper
                setTime={(time) => {
                  setSearch({ ...search, timeAnswer: time });
                }}
                p={0.3}
                label={"Thơi gian làm bài"}
              />
            </Item>
          </Mui.Grid>
        </Views.ViewBoard>
        {/* noi dung cau hoi */}
        <Views.ViewBoard>
          <Mui.Stack spacing={1}>
            <Mui.Stack py={1}>
              <Co.Text.Body.Medium>
                Mã câu hỏi:{" "}
                {`${searchCode.subjectCode}.${searchCode.chapterCode}.${searchCode.unitCode}.${searchCode.requirementCode}.${searchCode.typeQuestionCode}.T.S.${searchCode.targetCodes}.XX`}
              </Co.Text.Body.Medium>
            </Mui.Stack>
            <Ex.ExInputWrapper.Editor
              label={"Câu hỏi:"}
              name={"ads"}
              onChange={(e) => setQuestion((pre) => ({ ...pre, question: e }))}
              required
            />
            <Ex.ExInputWrapper.Editor
              label={"Đáp án đúng:"}
              name={"ads"}
              onChange={(e) => setQuestion((pre) => ({ ...pre, answer: e }))}
            />
            <Ex.ExInputWrapper.Editor
              label={"Hướng dẫn giải:"}
              name={"ads"}
              onChange={(e) => setQuestion((pre) => ({ ...pre, suggest: e }))}
            />

            <Mui.Stack>
              <Eui.EuiButton.AddNew name={"Thêm mới"} component={"button"} />
            </Mui.Stack>
          </Mui.Stack>
        </Views.ViewBoard>
      </Mui.Stack>
    </Views.ViewContent>
  );
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} xl={6}>
      {children}
    </Mui.Grid>
  );
};
