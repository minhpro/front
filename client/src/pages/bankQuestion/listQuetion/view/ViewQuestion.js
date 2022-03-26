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
        <InforQuestion data={data} />
        <p>Loại câu hỏi: {getType(data.type)}</p>
        <p> Ten cau hoi: {data.name}</p>
        <p>ID: {data.id}</p>
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
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={6} border={"solid 1px"}>
        <p>Lớp: {data.unitData?.chapterData?.subjectData?.classs?.name}</p>
      </Mui.Grid>
      <Mui.Grid item xs={6} border={"solid 1px"}>
        <p>Mon: {data.unitData?.chapterData?.subjectData?.name}</p>
      </Mui.Grid>
      <Mui.Grid item xs={12} border={"solid 1px"}>
        <p>Chuong: {data.unitData?.chapterData?.name}</p>
      </Mui.Grid>
      <Mui.Grid item xs={12} border={"solid 1px"}>
        <p>Bai: {data.unitData?.name}</p>
      </Mui.Grid>
    </Mui.Grid>
  );
};
