import { Stack } from "@mui/material";
import { EuiButton } from "components/Eui";
import { ExInputWrapper } from "Example";
import React from "react";
import { useSelector } from "react-redux";

import * as Function from "functions";
import * as Api from "api";
export const TypeSent = () => {
  // redux
  const reduxOtherConfig = useSelector((state) => state.reduxOtherConfig);

  const [data, setData] = React.useState("");

  function save() {
    Function.handler
      .api(() => Api.otherConfigApi.updateDuration(data))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
    console.log("submit");
  }
  return (
    <div>
      <ExInputWrapper.Basic
        label={
          "Thời gian hệ thống gửi link trước thời gian bắt đầu thi/ kiểm tra"
        }
        name={"time"}
        placeholder={reduxOtherConfig?.testingDuration}
        onChange={(e) => setData(e.target.value)}
        type={"number"}
      />
      <Stack direction={"row"} py={3} spacing={3}>
        <EuiButton.Cancel />
        <EuiButton.Progress name={"Lưu cấu hình"} onClick={save} />
      </Stack>
    </div>
  );
};
