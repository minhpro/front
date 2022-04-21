import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";
import { useParams } from "react-router-dom";
import * as Co from "components";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
import { useSelector } from "react-redux";
import { SecondFormat } from "utils";
import moment from "moment";
import styled from "styled-components";

export const DoTest = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.reduxChecking);
  const [data, setData] = React.useState(null);
  const [isDo, setIsDo] = React.useState(true);

  const [time, setTime] = React.useState("");

  const [question, setQuestion] = React.useState(0);
  const [done, setDone] = React.useState([0]);

  React.useEffect(async () => {
    try {
      const res = await Api.testKitApi.getExam(param.id);
      console.log(res);
      dispatch(Slide.checkingSlice.setTestKitId(param.id));
      setData(res);
      const classTime = new SecondFormat(res.time);
      setTime(classTime.getString());
    } catch (error) {
      console.log(error);
    }
  }, []);

  function han(i) {
    setQuestion(i);
    let data = done;
    let result = data.filter((index) => index !== i);

    result.push(i);
    setDone(result);
    console.log(result);
  }

  function nextQuestion(i) {
    if (i >= data.questions.length - 1 || done.includes(i + 1)) {
      return null;
    } else {
      han(i + 1);
    }
  }

  function backQuestion(i) {
    if (i <= 0 || done.includes(i - 1)) {
      return null;
    } else {
      han(i - 1);
    }
  }

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage("Đã nộp bài thi", "Đã xoá đớn vị kiến thức, id: ", "");

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "Nộp bài",
    "Xác nhận nộp bài"
  );

  async function confirm() {
    try {
      const res = Api.testKitApi.checking(result);
      console.log(res);
      handleSnack.add("");
      setIsDo(false);
    } catch (error) {
      console.log(error);
    }
    handleOpenNew.close();
    // navigate("/khao-thi/danh-sach-bai-thi");
  }

  return (
    <>
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />
      <Ex.ExModalPoppup.Basic
        open={isOpen}
        title={handleOpenNew.title}
        name={handleOpenNew.message}
        handleClose={() => handleOpenNew.close()}
        handleFunc={confirm}
        mw={300}
      />
      <Views.ViewContent title={"Khảo thí > " + data?.code}>
        <Mui.Stack direction={{ xs: "column", md: "row" }} spacing={1}>
          <Style.Nav>
            <Views.ViewBoard>
              <Mui.Stack spacing={2}>
                <Mui.Stack alignItems={"center"} spacing={1}>
                  <Co.Text.Body.Caption>Tổng thời gian</Co.Text.Body.Caption>
                  {data ? (
                    <Co.Card.Clock
                      timeSecond={data?.time}
                      nextTime={() => handleOpenNew.open()}
                    />
                  ) : null}
                </Mui.Stack>

                <Co.Text.Body.Medium>Chọn câu hỏi:</Co.Text.Body.Medium>
                <Mui.Divider />
                <Co.Button.ChooseQuestion.Wrapper>
                  {data ? (
                    data.questions.map((data, i) => {
                      return (
                        <Co.Button.ChooseQuestion
                          key={i}
                          i={i}
                          onClick={han}
                          choose={i === question}
                          done={done.includes(i)}
                        />
                      );
                    })
                  ) : (
                    <p>loading...</p>
                  )}
                </Co.Button.ChooseQuestion.Wrapper>
              </Mui.Stack>
              <Mui.Stack mt={5}>
                <Eui.EuiButton.AddType
                  name={"Nộp bài"}
                  onClick={() => handleOpenNew.open()}
                />
              </Mui.Stack>
            </Views.ViewBoard>
          </Style.Nav>
          <Mui.Box width={"100%"}>
            <Views.ViewBoard>
              <Mui.Stack alignItems={"center"}>
                {/* cau hoi */}
                <Mui.Stack width={"100%"}>
                  <Mui.Stack alignItems={"center"}>
                    <Mui.Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      width={"100%"}
                    >
                      <Co.Icon.IconWidth
                        src={Function.getImage.getPng("back")}
                        alt={"icon"}
                        onClick={() => backQuestion(question)}
                      />
                      <Co.Text.Body.Caption>
                        Thời gian làm bài
                      </Co.Text.Body.Caption>
                      <Co.Icon.IconWidth
                        src={Function.getImage.getPng("pre")}
                        alt={"icon"}
                        onClick={() => nextQuestion(question)}
                      />
                    </Mui.Stack>

                    <Co.Card.Clock
                      timeSecond={data?.questions[question].time}
                      nextTime={() => nextQuestion(question)}
                      move={question}
                    />
                    <Mui.Divider />
                  </Mui.Stack>
                  {data ? (
                    data.questions.map((item, i) => {
                      return (
                        <Style.Hide key={i} hide={question === i}>
                          <Mui.Stack mb={5}>
                            {item.type === "ConstructedResponseQuestion" ? (
                              <Co.Card.ViewQuestion.Constructed
                                index={i + 1}
                                id={item.id}
                                code={item.code}
                                question={item.question}
                                exam={true}
                              />
                            ) : (
                              <Co.Card.ViewQuestion.MultiChoice
                                index={i + 1}
                                id={item.id}
                                code={item.code}
                                question={item.question}
                                A={item.answerOne}
                                B={item.answerTwo}
                                C={item.answerThree}
                                D={item.answerFour}
                                exam={true}
                              />
                            )}
                          </Mui.Stack>
                        </Style.Hide>
                      );
                    })
                  ) : (
                    <p>loading...</p>
                  )}
                </Mui.Stack>
              </Mui.Stack>
            </Views.ViewBoard>
          </Mui.Box>
        </Mui.Stack>
      </Views.ViewContent>
    </>
  );
};

const Style = {
  Main: styled.main`
    margin: 20px 0;
    display: block;
    width: 100%;
  `,
  Nav: styled.nav`
    min-width: 300px;
  `,
  Hide: styled.div`
    display: ${(props) => (props.hide ? "block" : "none")};
    width: 100%;
  `,
};
