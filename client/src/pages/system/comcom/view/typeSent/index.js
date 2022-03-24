import { Stack } from "@mui/material";
import { EuiButton } from "components/Eui";
import { ExInputWrapper } from "Example";
import React from "react";
import { useSelector } from "react-redux";
export const TypeSent = () => {
  // redux
  const reduxOtherConfig = useSelector((state) => state.reduxOtherConfig);
  return (
    <div>
      <ExInputWrapper.Basic
        name={
          "Thời gian hệ thống gửi link trước thời gian bắt đầu thi/ kiểm tra"
        }
        placeholder={reduxOtherConfig?.testingDuration}
        onChange={() => console.log("adssd")}
        type={"number"}
      />
      <Stack direction={"row"} py={3} spacing={3}>
        <EuiButton.Cancel />
        <EuiButton.Progress name={"Luu cau hinh"} />
      </Stack>
    </div>
  );
};
