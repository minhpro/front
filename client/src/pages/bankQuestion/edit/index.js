import React from "react";
import { useParams } from "react-router-dom";
import * as Views from "views";
import * as Api from "api";
import { EditEssay } from "./EditEssay";
import { EditMulti } from "./EditMulti";
export const EditQuestion = () => {
  const param = useParams();

  const [data, setData] = React.useState(null);
  React.useEffect(async () => {
    let payload = { id: param.id };
    try {
      const res = await Api.questionApi.detail(payload);
      console.log(res);
      setData(res);
    } catch (error) {}
  }, []);
  return (
    <Views.ViewContent title={"Chỉnh sửa câu hỏi"}>
      {data ? (
        data.type === "MultiChoiceQuestion" ? (
          <EditMulti data={data} />
        ) : (
          <EditEssay />
        )
      ) : null}
    </Views.ViewContent>
  );
};
