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
import * as Co from "components";

export const CreateMatrix = () => {
  const [open, setIsOpen] = React.useState(false);
  const [search, setSearch] = React.useState({
    classId: null,
    subjectId: null,
    name: null,
    target: "EXAM",
    testTypeId: null,
    time: 0,
    scoreCalculationTypeId: 1,
    code: "",
    typeQuestionId: null,
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  // redux
  const dataNumber = useSelector((state) => state.reduxQuestionDistributions);

  console.log(dataNumber);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(Slide.questionDistributionsSlide.setQuestionDistributions([]));
  }, []);

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
      console.log("change nay");
      console.log(search);
    };

    handleSearch = () => {
      if (search.subjectId) {
        Function.handler
          .api(() => Api.chapterApi.search(search.subjectId))
          .then((res) => {
            console.log(res);
            // setChapter(res);
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
      console.log("add nay");
      const payload = {
        name: null,
        numberOfQuestions: dataNumber.total,
        questionSource: "EBD",
        scoreCalculationTypeId: search.scoreCalculationTypeId,
        target: search.target,
        testTypeId: search.testTypeId,
        time: 0,
        questionDistributions: [],
        subjectId: search.subjectId,
      };

      for (let i = 0; i < dataNumber?.data?.length; i++) {
        payload.questionDistributions.push({
          id: dataNumber.data[i].id,
          numberOfQuestions: dataNumber.data[i].numberOfQuestions,
          units: [],
        });
        for (let j = 0; j < dataNumber.data[i].unitData.length; j++) {
          payload.questionDistributions[i].units.push({
            id: dataNumber.data[i].unitData[j].id,
            questionDistributions:
              dataNumber.data[i].unitData[j].questionDistributions,
            requirements: [],
          });

          for (
            let h = 0;
            h < dataNumber.data[i].unitData[j].requirements.length;
            h++
          ) {
            payload.questionDistributions[i].units[j].requirements.push({
              id: dataNumber.data[i].unitData[j].requirements[h].id,
              numberOfQuestions:
                dataNumber.data[i].unitData[j].requirements[h]
                  .numberOfQuestions,
            });
          }
        }
      }
      console.log("huhu", payload);
      Api.matrixApi
        .add(
          Object.assign(payload, {
            name: search.name,
            time: search.time,
          })
        )
        .then((res) => {
          console.log("them success");
          setSnack({
            isOpen: true,
            message: "da them ma tran",
            severity: "success",
          });
        })
        .catch((error) => {
          setSnack({
            isOpen: true,
            message: error.message || error?.errors[0]?.value,
            severity: "error",
          });
        });

      this.handleClose();
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

    handleCloseSnack = () => {
      setSnack({
        isOpen: false,
        message: null,
        severity: null,
      });
    };
  }

  const func = new Func();

  React.useEffect(() => {
    func.handleSearch();
  }, [search.subjectId]);

  function resets(name) {
    setSearch({ ...search, [name]: null });
  }

  React.useEffect(() => {
    resets("subjectId");
  }, [search.classId]);

  return (
    <Views.ViewContent title={"Tạo ma trận đề thi mới"}>
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={func.handleCloseSnack}
        message={snack.message}
        severity={snack.severity}
      />
      {/* create */}
      <Ex.ExModalPoppup.Basic
        open={open}
        handleClose={func.handleClose}
        handleFunc={func.handleAdd}
        mw={300}
      />
      <Mui.Stack spacing={0.5}>
        {/* nav */}
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    onChange={func.handleChange}
                    value={search.classId || ""}
                    required
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    onChange={func.handleChange}
                    id={search.classId}
                    value={search.subjectId || ""}
                    required
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExInputWrapper.Basic
                label={"Tên ma trận đề thi:"}
                name={"name"}
                onChange={func.handleChange}
                placeholder={"Nhap ten ma tran"}
                required
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.MatrixTarget
                    onChange={func.handleChange}
                    value={search.target}
                    required
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.ExamType
                    onChange={func.handleChange}
                    required
                    value={search.testTypeId || ""}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>

            <Item>
              <Co.Time.TimeWrapper
                label={"Thời gian làm bài"}
                p={0.3}
                setTime={(time) => setSearch({ ...search, time: time })}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.Score
                required
                onChange={func.handleChange}
                value={search.scoreCalculationTypeId}
              />
            </Item>
            <Item>
              <Ex.ExDataSelect.TypeQuestion
                required
                onChange={func.handleChange}
                value={search.typeQuestionId}
              />
            </Item>
          </Mui.Grid>
          {/* <Mui.Stack
            direction={"row"}
            spacing={2}
            pt={2}
            borderTop={"solid 1px"}
            borderColor={"red"}
          >
            <Eui.EuiButton.Search onClick={func.handleSearch} />
          </Mui.Stack> */}
        </Views.ViewBoard>

        <Views.ViewBoard>
          <Mui.Stack spacing={3}>
            <h3> Danh sách chủ đề </h3>
            {search.subjectId ? (
              dataNumber.data?.map((data, i) => {
                return (
                  <Mui.Stack key={i}>
                    <Eui.EuiMatrix data={data} />
                  </Mui.Stack>
                );
              })
            ) : (
              <p> Chưa chọn môn học</p>
            )}
          </Mui.Stack>
        </Views.ViewBoard>
        <Views.ViewBoard>
          <Mui.Stack spacing={3}>
            <Eui.EuiButton.OpenCreate onClick={func.handleOpen} />
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
