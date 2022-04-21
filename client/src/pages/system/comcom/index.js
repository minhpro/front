import * as Mui from "@mui/material";
import React from "react";
import * as Views from "views";
import * as View from "./view";
import * as Eui from "./element";
import { useSelector } from "react-redux";
export const Comcom = () => {
  const nav = useSelector((s) => s.reduxNavSystem);
  const Nav = () => {
    switch (nav) {
      case 0:
        return <View.TypeExam />;

      case 1:
        // code block
        return <View.TypeTime />;
      case 2:
        // code block
        return <View.TypeQuestion />;
      case 3:
        // code block
        return <View.TypeScore />;
      case 4:
        // code block
        return <View.TypePercent />;
      case 5:
        // code block
        return <View.TypeSent />;

      default:

      // code block
    }
  };
  return (
    <Views.ViewContent title={"Cấu hình chung"}>
      <Mui.Stack spacing={0.5}>
        {/* nav */}
        <Views.ViewBoard>
          <Eui.Nav />
        </Views.ViewBoard>

        {/* bang */}
        <Views.ViewBoard>
          <Nav />
        </Views.ViewBoard>
      </Mui.Stack>
    </Views.ViewContent>
  );
};

const dataNav = [
  { name: "Dạng đề" },
  { name: "Thời gian làm bài" },
  { name: "Loại câu hỏi" },
  { name: "Cách tính điểm" },
  { name: "% câu hỏi trùng" },
  { name: "Thời gian gửi link" },
  // { name: "Thời gian gửi link bài thi/kiểm tra" },
];
