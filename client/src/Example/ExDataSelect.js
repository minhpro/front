import React from "react";
import { useSelector } from "react-redux";
import * as Function from "functions";
import * as Api from "api";
import * as Ex from "./ExInputWrapper";
import * as Contants from "assets/contants";

export const ExDataSelect = () => {
  return <div>ExDataSelect</div>;
};

ExDataSelect.Class = function Class({ onCodeChange, onChange, ...rest }) {
  // redux
  const reduxClass = useSelector((state) => state.reduxClass);

  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn lớp:"}
      name={"classId"}
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = reduxClass?.data?.find((item) => item.id == e.target.value);
          onCodeChange({ key: "classCode", value: row.code });
        }
      }}
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
      name={"testTypeId"}
      data={reduxTestType?.data}
      {...rest}
    />
  );
};

ExDataSelect.Subject = function Subject({
  id,
  onCodeChange,
  onChange,
  ...rest
}) {
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
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = subject?.data?.find((item) => item.id == e.target.value);
          onCodeChange({ key: "subjectCode", value: row.code });
        }
      }}
      {...rest}
    />
  );
};

ExDataSelect.Chapter = function Chapter({
  id,
  onCodeChange,
  onChange,
  ...rest
}) {
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
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = chapter?.data?.find((item) => item.id == e.target.value);
          onCodeChange({ key: "chapterCode", value: row.code });
        }
      }}
      {...rest}
    />
  );
};

ExDataSelect.Units = function Units({ id, onCodeChange, onChange, ...rest }) {
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
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = units?.data?.find((item) => item.id == e.target.value);
          onCodeChange({ key: "unitCode", value: row.code });
        }
      }}
      {...rest}
    />
  );
};

ExDataSelect.Require = function Require({
  id,
  onCodeChange,
  onChange,
  ...rest
}) {
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

  console.log("requirement:");
  console.log(data);
  return (
    <Ex.ExInputWrapper.Select
      label={"Chọn yêu cầu cần đạt:"}
      name={"requirementId"}
      data={data?.requirementData}
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = data?.requirementData?.find(
            (item) => item.id == e.target.value
          );
          onCodeChange({ key: "requirementCode", value: row.code });
        }
      }}
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
      name={"matrixId"}
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

ExDataSelect.Score = function Score({ ...rest }) {
  const data = useSelector((state) => state.reduxScoreSlide);
  return (
    <Ex.ExInputWrapper.Select
      label={"Cách tính điểm:"}
      name={"scoreCalculationTypeId"}
      // defautValue={data ? data[0].id : null}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.MatrixTarget = function MatrixTarget({ ...rest }) {
  const data = [
    {
      id: "EXAM",
      name: "Kiểm tra",
    },
    {
      id: "TESTING",
      name: "Khảo thí",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Mục tiêu ma trận:"}
      name={"target"}
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

ExDataSelect.TypeQuestion = function TypeQuestion({
  onCodeChange,
  onChange,
  ...rest
}) {
  // redux
  const reduxQuestionType = useSelector((state) => state.reduxQuestionType);

  return (
    <Ex.ExInputWrapper.Select
      label={"Mức độ câu hỏi:"}
      name={"typeQuestionId"}
      data={reduxQuestionType?.data}
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = reduxQuestionType?.data?.find(
            (item) => item.id == e.target.value
          );
          onCodeChange({ key: "typeQuestionCode", value: row.code });
        }
      }}
      {...rest}
    />
  );
};

ExDataSelect.Target = function Target({ ...rest }) {
  const data = [
    {
      id: "EXAM",
      name: "Khảo thí",
    },
    {
      id: "TESTING",
      name: "Kiểm tra",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Mục tiêu ma trận:"}
      name={"target"}
      defautValue={data[0].id}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.Role = function Role({ id, ...rest }) {
  // const [matrix, setMatrix] = React.useState(null);
  // // life cirle
  // React.useEffect(() => {
  //   if (id) {
  //     Function.handler
  //       .api(() =>
  //         Api.matrixApi.search({
  //           keyword: "",
  //           subjectId: id,
  //         })
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         setMatrix(res);
  //       })
  //       .catch((error) => console.log(error));
  //   } else setMatrix(null);
  // }, [id]);

  const data = [
    {
      id: 0,
      name: "Admin",
    },
    {
      id: 1,
      name: "Thanh vien",
    },
    {
      id: 2,
      name: "nhom truong",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Vai tro:"}
      name={"roleId"}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.Group = function Group({ id, ...rest }) {
  const data = [
    {
      id: 0,
      name: "Quan tri",
    },
    {
      id: 1,
      name: "Quan ly",
    },
    {
      id: 2,
      name: "Thanh vien",
    },
  ];

  return (
    <Ex.ExInputWrapper.Select
      label={"Nhom:"}
      name={"groupId"}
      data={data}
      {...rest}
    />
  );
};

ExDataSelect.Class2 = function Class({ onCodeChange, onChange, ...rest }) {
  // redux
  const reduxClass = useSelector((state) => state.reduxClass);

  return (
    <Ex.ExInputWrapper.Radio
      label={"Chọn lớp:"}
      name={"classId"}
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = reduxClass?.data?.find((item) => item.id == e.target.value);
          onCodeChange({ key: "classCode", value: row.code });
        }
      }}
      data={reduxClass?.data}
      {...rest}
    />
  );
};

ExDataSelect.Subject2 = function Subject({
  id,
  onCodeChange,
  onChange,
  ...rest
}) {
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
    <Ex.ExInputWrapper.Radio
      label={"Chọn môn:"}
      name={"subjectId"}
      data={subject?.data}
      onChange={(e) => {
        onChange(e);
        if (onCodeChange) {
          let row = subject?.data?.find((item) => item.id == e.target.value);
          onCodeChange({ key: "subjectCode", value: row.code });
        }
      }}
      {...rest}
    />
  );
};
