import React from "react";
import * as Function from "functions";
import * as Api from "api";
import * as Mui from "@mui/material";
import styled from "styled-components";

export const ViewQuestion = (id) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    Function.handler
      .api(() => Api.questionApi.detail(id || null))
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
        <p>Chi tiết câu hỏi:</p>
        <DetailQuestion data={data} />
      </Mui.Stack>
    );
  };

  return <Mui.Stack>{data ? <Question /> : <div> load</div>}</Mui.Stack>;
};

const InforQuestion = ({ data }) => {
  function getType(text) {
    if (text === "MultiChoiceQuestion") {
      return "Câu hỏi trắc nghiệm";
    } else return "Câu hỏi tự luận";
  }
  return (
    <>
      <Item xs={6}>
        <p>Lớp: {data.unitData?.chapterData?.subjectData?.classs?.name}</p>
      </Item>
      <Item xs={6}>
        <p>Môn: {data.unitData?.chapterData?.subjectData?.name}</p>
      </Item>
      <Item xs={12}>
        <p>Chủ đề: {data.unitData?.chapterData?.name}</p>
      </Item>
      <Item xs={12}>
        <p>Bài: {data.unitData?.name}</p>
      </Item>
      <Item xs={6}>
        <p>{getType(data.type)}</p>
      </Item>
      <Item xs={6}>
        <p>Code: {data.code}</p>
      </Item>
      <Item xs={12}>
        <p>Thời gian làm bài: {data.time}</p>
      </Item>
      <Item xs={6}>
        <p>Điểm: {data.point}</p>
      </Item>
      <Item xs={6}>
        <p>Mức độ câu hỏi: {data.questionTypeData?.name || "muc do"}</p>
      </Item>
    </>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item {...rest} border={"solid 1px"} p={1}>
      {children}
    </Mui.Grid>
  );
};

const DetailQuestion = ({ data }) => {
  return (
    <>
      {data.type === "ConstructedResponseQuestion" ? (
        <DetailQuestion.Contruc data={data} />
      ) : (
        <DetailQuestion.Multi data={data} />
      )}
    </>
  );
};

DetailQuestion.Contruc = function ({ data }) {
  return (
    <Mui.Grid container>
      <Item xs={12}>
        <p>Câu hỏi:</p>
        <div dangerouslySetInnerHTML={{ __html: data.question }} />
      </Item>
      <Item xs={12}>
        <p>Hướng dẫn giải:</p>
        <div dangerouslySetInnerHTML={{ __html: data.suggest }} />
      </Item>
      <Item xs={12}>
        <p>Đáp án câu hỏi:</p>
        <div dangerouslySetInnerHTML={{ __html: data.suggest }} />
      </Item>
    </Mui.Grid>
  );
};

DetailQuestion.Multi = function ({ data }) {
  function getAnswer(answer) {
    switch (answer) {
      case 0:
        return "A";
      case 1:
        return "B";
      case 2:
        return "C";
      case 3:
        return "D";
    }
  }

  return (
    <Mui.Grid container>
      <Item xs={12}>
        <p>Câu hỏi:</p>
        <div dangerouslySetInnerHTML={{ __html: data.question }} />
      </Item>
      <Item xs={12}>
        <p>Hướng dẫn giải:</p>
        <div dangerouslySetInnerHTML={{ __html: data.suggest }} />
      </Item>
      <Item xs={12}>
        <p>Đáp án câu hỏi: {getAnswer(data.answer)}</p>
      </Item>
      <Item xs={12}>
        <P isAnswer={data.answer === 0}>Đáp án A:</P>
        <div dangerouslySetInnerHTML={{ __html: data.answerOne }} />
      </Item>
      <Item xs={12}>
        <P isAnswer={data.answer === 1}>Đáp án B:</P>
        <div dangerouslySetInnerHTML={{ __html: data.answerTwo }} />
      </Item>
      <Item xs={12}>
        <P isAnswer={data.answer === 2}>Đáp án C:</P>
        <div dangerouslySetInnerHTML={{ __html: data.answerThree }} />
      </Item>
      <Item xs={12}>
        <P isAnswer={data.answer === 3}>Đáp án D:</P>
        <div dangerouslySetInnerHTML={{ __html: data.answerFour }} />
      </Item>
    </Mui.Grid>
  );
};

const P = styled.p`
  color: ${(props) => (props.isAnswer ? "red" : null)};
`;
