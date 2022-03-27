import React from "react";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";
import * as Ex from "./ExInputWrapper";

export const ExDataSelect = () => {
  return <div>ExDataSelect</div>;
};

ExDataSelect.Class = function Class({ ...rest }) {
  // redux
  const reduxClass = useSelector((state) => state.reduxClass);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn lớp:"}
      name={"classId"}
      data={reduxClass?.data}
      {...rest}
    />
  );
};

ExDataSelect.ExamType = function ExamType({ ...rest }) {
  // redux
  const reduxTestType = useSelector((state) => state.reduxTestType);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn dạng đề thi:"}
      name={"examTypeId"}
      data={reduxTestType?.data}
      {...rest}
    />
  );
};

ExDataSelect.Subject = function Subject({ id, ...rest }) {
  // redux
  const [subject, setSubject] = React.useState(null);
  React.useEffect(() => {
    if (id) {
      Function.handler
        .api(() => Api.subjectApi.search(id))
        .then((res) => {
          console.log(res);
          setSubject(res);
        })
        .catch((error) => console.log(error));
    } else setSubject(null);
  }, [id]);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn môn:"}
      name={"subjectId"}
      data={subject?.data}
      {...rest}
    />
  );
};

ExDataSelect.Chapter = function Chapter({ id, ...rest }) {
  const [chapter, setChapter] = React.useState(null);
  // life cirle
  React.useEffect(() => {
    if (id) {
      Function.handler
        .api(() => Api.chapterApi.search(id))
        .then((res) => {
          console.log(res);
          setChapter(res);
        })
        .catch((error) => console.log(error));
    } else setChapter(null);
  }, [id]);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn chủ đề:"}
      name={"chapterId"}
      data={chapter?.data}
      {...rest}
    />
  );
};

ExDataSelect.Units = function Units({ id, ...rest }) {
  const [units, setUnits] = React.useState(null);
  // life cirle
  React.useEffect(() => {
    if (id) {
      Function.handler
        .api(() => Api.unitApi.search(id))
        .then((res) => {
          console.log(res);
          setUnits(res);
        })
        .catch((error) => console.log(error));
    } else setUnits(null);
  }, [id]);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn đơn vị kiến thức:"}
      name={"unitId"}
      data={units?.data}
      {...rest}
    />
  );
};

ExDataSelect.Require = function Require({ id, ...rest }) {
  const [data, setData] = React.useState(null);
  // life cirle
  React.useEffect(() => {
    if (id) {
      Function.handler
        .api(() => Api.unitApi.detail(id))
        .then((res) => {
          setData(res);
        })
        .catch((error) => console.log(error));
    } else setData(null);
  }, [id]);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn yêu cầu kiến thức:"}
      name={"requirementId"}
      data={data?.requirementData}
      {...rest}
    />
  );
};

ExDataSelect.Matrix = function Matrix({ id, ...rest }) {
  const [matrix, setMatrix] = React.useState(null);
  // life cirle
  React.useEffect(() => {
    if (id) {
      Function.handler
        .api(() =>
          Api.matrixApi.search({
            keyword: "",
            subjectId: id,
          })
        )
        .then((res) => {
          console.log(res);
          setMatrix(res);
        })
        .catch((error) => console.log(error));
    } else setMatrix(null);
  }, [id]);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn ma trận:"}
      name={"matrixID"}
      data={matrix?.data}
      {...rest}
    />
  );
};

ExDataSelect.Classify = function Classify({ ...rest }) {
  const data = [
    {
      id: "THEORY",
      name: "Lý thuyết",
    },
    {
      id: "WORKING",
      name: "Bài tập",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn loại câu hỏi:"}
      name={"classification"}
      defautValue={data[0].id}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.Bank = function Bank({ ...rest }) {
  const data = [
    {
      id: "EDB",
      name: "EBD",
    },
    {
      id: "PERSON",
      name: "Cá nhân",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn ngân hàng câu hỏi:"}
      name={"bank"}
      defautValue={data[0].id}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.MatrixTarget = function MatrixTarget({ ...rest }) {
  const data = [
    {
      id: 0,
      name: "Kiểm tra",
    },
    {
      id: 1,
      name: "Khảo thí",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Mục tiêu ma trận:"}
      name={"matrixTargetId"}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.TimeType = function TimeType({ ...rest }) {
  const data = [
    {
      id: 0,
      name: "gio",
    },
    {
      id: 1,
      name: "phut",
    },
    {
      id: 1,
      name: "giay",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn đơn vị thời gian:"}
      name={"timeTypeId"}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.TypeQuestion = function TypeQuestion({ ...rest }) {
  // redux
  const reduxQuestionType = useSelector((state) => state.reduxQuestionType);

  return (
    <Ex.ExInputWrapper.Select
      label={"Mức độ câu hỏi:"}
      name={"typeQuestionId"}
      data={reduxQuestionType?.data}
      {...rest}
    />
  );
};
