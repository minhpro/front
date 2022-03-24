import { Stack } from "@mui/material";
import { EuiButton } from "components/Eui";
import { ExInputWrapper } from "Example";
import React from "react";
import { useSelector } from "react-redux";
export const TypePercent = () => {
  // redux
  const reduxOtherConfig = useSelector((state) => state.reduxOtherConfig);
  return (
    <div>
      <ExInputWrapper.Basic
        name={"Số % câu hỏi trùng khi hệ thống bốc đề Kiểm tra/ Thi"}
        placeholder={reduxOtherConfig?.questionDuplicationRate}
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
