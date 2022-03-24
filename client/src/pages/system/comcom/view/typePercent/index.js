import { Stack } from "@mui/material";
import { EuiButton } from "components/Eui";
import { ExInputWrapper } from "Example";
import React from "react";

export const TypePercent = () => {
  return (
    <div>
      <ExInputWrapper.Basic
        name={"Số % câu hỏi trùng khi hệ thống bốc đề Kiểm tra/ Thi"}
        placeholder={20}
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
