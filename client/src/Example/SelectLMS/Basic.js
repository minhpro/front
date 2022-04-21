import * as Sui from "components";
import { useSelector } from "react-redux";
import React from "react";
import * as Api from "api";

export const Basic = () => {
  return <div>Basic</div>;
};

Basic.Class = function Classs({ ...rest }) {
  const reduxClass = useSelector((state) => state.reduxClass);
  return (
    <Sui.Input.Label
      label={"Chọn lớp:"}
      name={"classId"}
      data={reduxClass?.data}
      {...rest}
    />
  );
};

Basic.Subject = function Classs({ id, ...rest }) {
  // state
  const [subject, setSubject] = React.useState(null);

  async function fetchData() {
    try {
      const res = await Api.subjectApi.search(id);
      console.log(res);
      setSubject(res);
    } catch (error) {
      console.log(error);
    }
  }
  //   lifeCircle
  React.useEffect(() => {
    if (id) {
      fetchData();
    } else setSubject(null);
  }, [id]);
  return (
    <Sui.Input.Label
      label={"Chọn môn:"}
      name={"subjectId"}
      data={subject?.data}
      {...rest}
    />
  );
};
