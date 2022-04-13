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
import { useNavigate } from "react-router-dom";

export const DoTest = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const result = useSelector((state) => state.reduxChecking);
  const [data, setData] = React.useState(null);
  const [isDo, setIsDo] = React.useState(true);

  React.useEffect(async () => {
    try {
      const res = await Api.testKitApi.getExam(param.id);
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
        {isDo ? (
          <Views.ViewBoard>
            <Mui.Stack sx={{ height: "70vh", overflowY: "scroll" }}>
              {data
                ? data.questions.map((item, i) => (
                    <Mui.Stack key={i} mb={5}>
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
                  ))
                : null}
            </Mui.Stack>
            <Mui.Stack mt={5}>
              <Eui.EuiButton.AddType
                name={"Nộp bài"}
                onClick={() => handleOpenNew.open()}
              />
            </Mui.Stack>
          </Views.ViewBoard>
        ) : (
          <p>Đã nộp bài</p>
        )}
      </Views.ViewContent>
    </>
  );
};
