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

ExDataSelect.Subject = function Subject({ id, ...rest }) {
  const [subject, setSubject] = React.useState(null);
  // life cirle
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
      label={"Chọn chương:"}
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
      label={"Chọn bài:"}
      name={"unitId"}
      data={units?.data}
      {...rest}
    />
  );
};

ExDataSelect.Classify = function Classify({ ...rest }) {
  const data = [
    {
      id: 0,
      name: "Ly thuyet",
    },
    {
      id: 1,
      name: "Bai tap",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Chon dang cau hoi:"}
      name={"classifyId"}
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
      label={"Chon loai thoi gian:"}
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
      label={"Chon loai cau hoi:"}
      name={"typeQuestionId"}
      data={reduxQuestionType?.data}
      {...rest}
    />
  );
};
