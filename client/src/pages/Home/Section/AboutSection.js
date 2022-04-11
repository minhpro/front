import React from "react";
import styled from "styled-components";
import * as Mui from "@mui/material";
import * as Co from "components";
import { getImage } from "functions";

export const AboutSection = () => {
  return (
    <Style.Wrapper className="container">
      <Mui.Grid container>
        <Item>
          <Mui.Stack
            width={{ xs: 300, md: 400 }}
            borderRadius={2}
            bgcolor={"primary.main"}
            sx={{
              height: 200,
              position: "absolute",
              bottom: 0,
              right: { xs: 0, md: 90 },
              zIndex: -1,
            }}
          ></Mui.Stack>
          <Mui.Stack
            width={{ xs: "95%", md: "80%" }}
            borderRadius={2}
            mb={2}
            sx={{ overflow: "hidden" }}
          >
            <Style.HeroImg src={getImage.getJpeg("about22")} />
          </Mui.Stack>
        </Item>
        <Item>
          <Mui.Stack>
            <Style.Title>Về Chúng Tôi - EBD LMS </Style.Title>
            <Mui.Stack spacing={2}>
              <p>
                Là giải pháp công nghệ trong khảo thí dành cho giáo viên và học
                sinh từ lớp 1 đến lớp 12. EBD LMS là giải pháp giúp giảm tải các
                tác vụ thủ công cho giáo viên và học sinh, giúp thầy trò có thể
                tập trung nhiều hơn vào việc dạy và học.
              </p>
              <p>
                Kho bài tập, lý thuyết, đề thi, đề kiểm tra bám sát chương trình
                học giúp các em có thể học trước chương trình hoặc ôn tập hiệu
                quả.
              </p>
              <Mui.Stack spacing={1}>
                {aboutData.map((item, i) => {
                  return <Co.Card.ListAbout key={i} text={item.text} />;
                })}
              </Mui.Stack>
            </Mui.Stack>
          </Mui.Stack>
        </Item>
      </Mui.Grid>
    </Style.Wrapper>
  );
};
const Style = {
  Wrapper: styled.section`
    min-height: 300px;
    margin-top: 40px;
  `,

  Title: styled.h3`
    color: var(--bs-primary);
  `,

  HeroImg: styled.img`
    width: 100%;
  `,
  HeathyImg: styled.img`
    width: 100%;
  `,
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item xs={12} md={6} {...rest} sx={{ position: "relative" }}>
      {children}
    </Mui.Grid>
  );
};

const aboutData = [
  { text: " Đầy đủ bài tập trắc nghiệm và lời giải chi tiết." },
  { text: " Hệ thống lý thuyết cô đọng, dễ hiểu." },
  { text: " Đề thi, đề kiểm tra bám sát chương trình học trên lớp." },
  { text: " Hỏi đáp tương tác khi không hiểu bài." },
];
