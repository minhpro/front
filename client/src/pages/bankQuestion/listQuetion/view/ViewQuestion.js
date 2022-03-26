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
        <p>Loại câu hỏi: {getType(data.type)}</p>
      </Mui.Stack>
    );
  };

  return <Mui.Stack>{data ? <Question /> : <div> load</div>}</Mui.Stack>;
};
