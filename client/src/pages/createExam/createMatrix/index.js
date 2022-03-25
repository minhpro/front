import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
import { useSelector } from "react-redux";
export const CreateMatrix = () => {
  const [open, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState({
    classId: null,
    subjectId: null,
  });

  // redux
  const dataNumber = useSelector((state) => state.reduxQuestionDistributions);

  console.log(dataNumber);
  const dispatch = useDispatch();

  const [chapter, setChapter] = React.useState(null);
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

    handleSearch = () => {
      if (search.subjectId) {
        Function.handler
          .api(() => Api.chapterApi.search(search.subjectId))
          .then((res) => {
            console.log(res);
            setChapter(res);
            dispatch(
              Slide.questionDistributionsSlide.setQuestionDistributions(
                res?.data
              )
            );
          })
          .catch((error) => console.log(error));
      }
    };

    handleAdd = () => {
      const payload = {
        name: "name",
        numberOfQuestions: 50,
        questionSource: "EBD",
        time: 123,
        questionDistributions: [],
      };

      dataNumber.forEach((data) => {
        payload.questionDistributions.push({
          id: data.id,
          numberOfQuestions: data.numberOfQuestions,
          units: [],
        });
        data.unitData.forEach((data, i) => {
          payload.questionDistributions[i].units.push({
            id: data.id,
            numberOfQuestions: data.numberOfQuestions,
          });
        });
      });

      console.log(payload);
    };

    onSubmit = (e) => {
      e.preventDefault();
      console.log("submit");
    };

    onEdit = (e) => {
      console.log("submit");
    };

    handleClose = () => {
      setIsOpen(false);
    };
    handleOpen = () => {
      setIsOpen(true);
    };
  }

  const func = new Func();

  return (
    <Views.ViewContent title={"Tạo ma trận đề thi mới"}>
      {/* create */}
      <Ex.ExModalPoppup.Create
        open={open}
        handleClose={func.handleClose}
        handleCreate={func.handleAdd}
      />
      <Mui.Stack spacing={0.5}>
        {/* nav */}
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên ma trận đề thi:"}
                name={"matrixName"}
                onChange={func.handleChange}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class onChange={func.handleChange} />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    onChange={func.handleChange}
                    id={search.classId}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.MatrixTarget onChange={func.handleChange} />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.ExamType onChange={func.handleChange} />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExInputWrapper.Basic
                    label={"Số lượng câu hỏi:"}
                    name={"numberQuestion"}
                    type={"number"}
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.ExamType onChange={func.handleChange} />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExInputWrapper.Basic
                    label={"Thoi gian:"}
                    name={"time"}
                    type={"number"}
                    onChange={func.handleChange}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.TimeType />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
          </Mui.Grid>
          <Mui.Stack
            direction={"row"}
            spacing={2}
            pt={2}
            borderTop={"solid 1px"}
            borderColor={"red"}
          >
            <Eui.EuiButton.Progress
              name={"Tim kiem"}
              onClick={func.handleSearch}
            />
          </Mui.Stack>
        </Views.ViewBoard>

        <Views.ViewBoard>
          <Mui.Stack spacing={3}>
            {dataNumber ? (
              dataNumber?.map((data, i) => {
                return <Eui.EuiMatrix data={data} />;
              })
            ) : (
              <h4> Chưa chọn môn học</h4>
            )}
          </Mui.Stack>
        </Views.ViewBoard>
        <Views.ViewBoard>
          <Mui.Stack spacing={3}>
            <Eui.EuiButton.Progress
              name={"Tao moi"}
              onClick={func.handleOpen}
            />
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
