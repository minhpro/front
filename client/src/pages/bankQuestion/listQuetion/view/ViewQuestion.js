import React from "react";
import * as Function from "functions";
import * as Api from "api";
import * as Mui from "@mui/material";

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
      <Mui.Stack>
        <p>Thông tin câu hỏi:</p>
        <InforQuestion data={data} />

        <p> Ten cau hoi: {data.name}</p>

        <p>thoi gian lam bai: {data.time}</p>
        <p>Cau hoi</p>

        <div dangerouslySetInnerHTML={{ __html: data.question }} />
        <p>Dap an Dung</p>
        <div dangerouslySetInnerHTML={{ __html: data.answerOne }} />

        <p>Huong dan giai</p>
        <div dangerouslySetInnerHTML={{ __html: data.suggest }} />
        <p>Huong dan giai</p>
        <div dangerouslySetInnerHTML={{ __html: data.suggest }} />
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
    <Mui.Grid container>
      <Item xs={6} border={"solid 1px"}>
        <p>Lớp: {data.unitData?.chapterData?.subjectData?.classs?.name}</p>
      </Item>
      <Item xs={6} border={"solid 1px"}>
        <p>Môn: {data.unitData?.chapterData?.subjectData?.name}</p>
      </Item>
      <Item xs={12} border={"solid 1px"}>
        <p>Chương: {data.unitData?.chapterData?.name}</p>
      </Item>
      <Item xs={12} border={"solid 1px"}>
        <p>Bài: {data.unitData?.name}</p>
      </Item>
      <Item xs={12} border={"solid 1px"}>
        <p>{getType(data.type)}</p>
      </Item>
      <Item xs={12} border={"solid 1px"}>
        <p>Thời gian làm bài: {data.time}</p>
      </Item>
    </Mui.Grid>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item {...rest} border={"solid 1px"} p={1}>
      {children}
    </Mui.Grid>
  );
};
