import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import React from "react";
import * as Views from "views";
import * as View from "./view";

export const PagesSystemComcom = () => {
  const [nav, setNav] = React.useState(0);
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
        return <div />;
      case 4:
        // code block
        return <View.TypePercent />;
      case 5:
        // code block
        return <View.TypeSent />;
      // case 6:
      //   // code block
      //   return <View.ViewTimeSent />;
      default:

      // code block
    }
  };
  return (
    <Views.ViewContent title={"Cau hinh chung"}>
      <Mui.Stack spacing={0.5}>
        {/* nav */}
        <Views.ViewBoard>
          <Mui.Stack
            direction={"row"}
            justifyContent={"flex-start"}
            flexWrap={"wrap"}
            alignItems={"center"}
            spacing={2}
          >
            {dataNav.map((link, i) => {
              return (
                <Eui.EuiNavMenu.NavBoard
                  key={i}
                  onClick={() => setNav(i)}
                  isOpen={nav === i}
                  name={link.name}
                />
              );
            })}
          </Mui.Stack>
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
  { name: "Dang de" },
  { name: "Thoi gian lam bai" },
  { name: "Loai cau hoi" },
  { name: "Cach tinh diem" },
  { name: "% trung cau hoi" },
  { name: "Thoi gian gui link" },
  // { name: "Thời gian gửi link bài thi/kiểm tra" },
];
