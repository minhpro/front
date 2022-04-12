import React from "react";
import * as Function from "functions";
import * as Api from "api";
import * as Mui from "@mui/material";
import styled from "styled-components";
import { Card } from "components";

export const ViewQuestion = (id) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    Function.handler
      .api(() => Api.privateQuestionApi.detail(id || null))
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch((error) => console.log(error));
  }, []);

  function getType(text) {
    if (text === "MultiChoiceQuestion") {
      return "Câu hỏi trắc nghiệm";
    } else return "Câu hỏi tự luận";
  }

  const Question = () => {
    return (
      <Mui.Stack spacing={2} sx={{ maxHeight: "50vh", overflowY: "scroll" }}>
        <p>Thông tin câu hỏi:</p>
        <InforQuestion data={data} />
      </Mui.Stack>
    );
  };

  return <Mui.Stack>{data ? <Question /> : <div> load</div>}</Mui.Stack>;
};

const InforQuestion = ({ data }) => {
  return (
    <>
      {data.type === "MultiChoiceQuestion" ? (
        <Card.ViewQuestion.MultiChoice
          code={data.code}
          question={data.question}
          A={data.answerOne}
          B={data.answerTwo}
          C={data.answerThree}
          D={data.answerFour}
        />
      ) : (
        <Card.ViewQuestion.Constructed
          code={data.code}
          question={data.question}
        />
      )}
      <Card.ViewAnswer suggest={data.suggest} answer={data.answer} />
    </>
  );
};
