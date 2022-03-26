import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";

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

  return (
    <Views.ViewContent title={"Them moi cau tu luan"}>
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
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Ten cau hoi"}
                name={"questionName"}
                required
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    required
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    required
                    id={search.classId}
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExDataSelect.Chapter
                required
                id={search.subjectId}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Units
                required
                id={search.chapterId}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Classify
                    required
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.TypeQuestion
                    required
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={2}>
                <Mui.Grid item xs={6}>
                  <Ex.ExInputWrapper.Basic
                    label={"Thoi gian tra loi"}
                    name={"timeAnswer"}
                    type={"number"}
                    required
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.TimeType required />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
          </Mui.Grid>
        </Views.ViewBoard>
        {/* noi dung cau hoi */}
        <Views.ViewBoard>
          <Mui.Stack spacing={1}>
            <Ex.ExInputWrapper.Editor
              label={"Cau hoi:"}
              name={"ads"}
              defaultValue={"Nhap cau hoi"}
              onChange={(e) => setQuestion((pre) => ({ ...pre, question: e }))}
              required
            />
            <Ex.ExInputWrapper.Editor
              label={"Dap an dung:"}
              name={"ads"}
              defaultValue={"Nhap dap an dung"}
              onChange={(e) => setQuestion((pre) => ({ ...pre, answer: e }))}
            />
            <Ex.ExInputWrapper.Editor
              label={"Huong dan giai:"}
              name={"ads"}
              defaultValue={"Nhap huong dan giai"}
              onChange={(e) => setQuestion((pre) => ({ ...pre, suggest: e }))}
            />

            <Mui.Stack>
              <Eui.EuiButton.Progress name={"Them moi"} component={"button"} />
            </Mui.Stack>
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
