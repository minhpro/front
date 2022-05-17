import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
import { useParams } from "react-router-dom";
import * as Class from "Class";

export const ViewExam = () => {
  const { id } = useParams();
  const [data, setData] = React.useState(null);

  const [num, setNum] = React.useState(0);
  async function getExam() {
    try {
      const res = await Api.examApi.detail(id);
      setData(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getQuestion = (a) => {
    console.log(a - 1);
    setNum(a - 1);
  };

  React.useEffect(() => {
    getExam();
  }, []);
  return (
    <Views.ViewContent
      title={`Quản lý đề gốc: ${data ? data.name : "name"} `}
    >
      <Mui.Stack spacing={1}>
        <Views.ViewBoard>
          {data ? <CardExam data={data} /> : null}
        </Views.ViewBoard>
        <Views.ViewBoard>
          {data ? (
            <CardChooseQuestion
              data={data?.questionData}
              onClick={getQuestion}
              id={num}
            />
          ) : null}
        </Views.ViewBoard>

        <Views.ViewBoard>
          {data ? (
            <QuestionWrapper num={num} data={data?.questionData} />
          ) : null}
        </Views.ViewBoard>
      </Mui.Stack>
    </Views.ViewContent>
  );
};

const Items = ({ name, value, children, ...rest }) => {
  return (
    <Mui.Stack direction={"row"}>
      <Items.Chil bgcolor={"red"} width={180}>
        <h3>{name || "name"}</h3>
      </Items.Chil>
      <Items.Chil width={"100%"}> {value || "null"}</Items.Chil>
    </Mui.Stack>
  );
};

Items.Chil = function ({ children, ...rest }) {
  return (
    <Mui.Stack py={1} px={2} {...rest} border={"solid 1px"}>
      {children}
    </Mui.Stack>
  );
};

const CardExam = ({ data }) => {
  return (
    <Mui.Stack spacing={1}>
      <h2> Chi tiết đề thi: </h2>
      <Mui.Stack
        borderRadius={4}
        sx={{ overflow: "hidden" }}
        border={"solid 1px"}
      >
        <Items name={"Code:"} value={data?.code} />
        <Items
          name={"Lớp học:"}
          value={data?.testMatrixData?.subjectData?.classs?.name}
        />
        <Items
          name={"Môn học:"}
          value={data?.testMatrixData?.subjectData?.name}
        />
        <Items name={"Ma trận đề thi:"} value={data?.testMatrixData?.name} />
      </Mui.Stack>
    </Mui.Stack>
  );
};

const CardChooseQuestion = ({ data, id, ...rest }) => {
  return (
    <Mui.Stack spacing={1}>
      <h2> Chọn câu hỏi: </h2>
      <Mui.Stack
        borderRadius={4}
        sx={{ overflow: "hidden" }}
        border={"solid 1px"}
      >
        <Mui.Stack
          direction={"row"}
          justifyContent={"space-between"}
          bgcolor={"grey.300"}
          p={2}
        >
          <h4>Tong so cau: {data.length}</h4>
        </Mui.Stack>
        <Mui.Stack
          direction={"row"}
          justifyContent={"flex-start"}
          flexWrap={"wrap"}
          p={2}
          columnGap={2}
          rowGap={2}
        >
          {data.length
            ? data?.map((item, i) => {
                return (
                  <QuestionItem
                    key={i}
                    num={i + 1}
                    isOpen={i === id}
                    {...rest}
                  />
                );
              })
            : null}
        </Mui.Stack>
      </Mui.Stack>
    </Mui.Stack>
  );
};

const QuestionItem = ({ num, isOpen, onClick, ...rest }) => {
  return (
    <Mui.Stack
      sx={{
        width: 100,
        height: 50,
        backgroundColor: isOpen ? "primary.main" : "grey.300",
        cursor: "pointer",
        ":hover": { backgroundColor: "primary.main" },
      }}
      borderRadius={5}
      justifyContent={"center"}
      alignItems={"center"}
      onClick={() => onClick(num)}
      {...rest}
    >
      <h5>Cau: {num || "1"}</h5>
    </Mui.Stack>
  );
};

const QuestionWrapper = ({ num, data, ...rest }) => {
  return (
    <Mui.Stack spacing={2}>
      {num !== null ? (
        <>
          <h2>Câu hỏi: {num + 1} </h2>
          <div dangerouslySetInnerHTML={{ __html: data[num]?.question }} />
          {data[num]?.type === "MultiChoiceQuestion" ? (
            <Mui.Stack spacing={1}>
              <AnswerItem answer={"A"} content={data[num]?.answerOne} />
              <AnswerItem answer={"B"} content={data[num]?.answerOne} />
              <AnswerItem answer={"C"} content={data[num]?.answerOne} />
              <AnswerItem answer={"D"} content={data[num]?.answerOne} />
            </Mui.Stack>
          ) : null}

          <Mui.Stack bgcolor={"green"} borderRadius={2} p={1} spacing={1}>
            <h5>Gợi ý làm bài:</h5>
            <div dangerouslySetInnerHTML={{ __html: data[num]?.suggest }} />
          </Mui.Stack>
        </>
      ) : (
        <h2>Chưa chọn câu hỏi</h2>
      )}
    </Mui.Stack>
  );
};

const AnswerItem = ({ answer, content }) => {
  return (
    <Mui.Stack spacing={1}>
      <Mui.Divider />
      <Mui.Stack direction={"row"} spacing={2}>
        <h4>{answer}.</h4>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Mui.Stack>
    </Mui.Stack>
  );
};
