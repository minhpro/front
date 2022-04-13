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

export const ViewResult = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.reduxChecking);
  const [data, setData] = React.useState(null);
  React.useEffect(async () => {
    try {
      const res = await Api.memberApi.getResult(param.id);
      console.log(res);
      dispatch(Slide.checkingSlice.setTestKitId(param.id));
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    } catch (error) {
      console.log(error);
    }
    handleOpenNew.close();
  }

  return (
    <>
      <Ex.ExModalPoppup.Basic
        open={isOpen}
        title={handleOpenNew.title}
        name={handleOpenNew.message}
        handleClose={() => handleOpenNew.close()}
        handleFunc={confirm}
      />
      <Views.ViewContent title={"Kết quả thi > " + data?.code}>
        <Views.ViewBoard>
          <Mui.Stack sx={{ height: "70vh", overflowY: "scroll" }}>
            {data
              ? data.map((item, i) => (
                  <Mui.Stack key={i} mb={5}>
                    {item.type === "ConstructedResponseQuestion" ? (
                      <Co.Card.ViewResult.Constructed
                        index={i + 1}
                        id={item.id}
                        code={item.code}
                        question={item.question}
                        studentAnswer={item.studentAnswer}
                      />
                    ) : (
                      <Co.Card.ViewResult.MultiChoice
                        index={i + 1}
                        id={item.id}
                        code={item.code}
                        question={item.question}
                        A={item.answerOne}
                        B={item.answerTwo}
                        C={item.answerThree}
                        D={item.answerFour}
                        studentAnswer={item.studentAnswer}
                        correctAnswer={item.correctAnswer}
                      />
                    )}
                  </Mui.Stack>
                ))
              : null}
          </Mui.Stack>
        </Views.ViewBoard>
      </Views.ViewContent>
    </>
  );
};
