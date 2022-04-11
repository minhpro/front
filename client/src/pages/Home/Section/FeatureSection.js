import * as Mui from "@mui/material";
import * as Co from "components";
import React from "react";
import styled from "styled-components";

export const FeatureSection = () => {
  return (
    <Style.Wrapper className="container">
      <Mui.Stack justifyContent={"center"} alignItems={"center"}>
        <Style.Title>Ưu Điểm Của EBD LMS</Style.Title>
        <p style={{ textAlign: "center" }}>
          Được xây dựng theo chương trình đào tạo và đảm bảo các yếu tố bảo mật
          dữ liệu
        </p>

        <Mui.Grid container columnSpacing={2} rowSpacing={4}>
          {data.map((item, i) => {
            return (
              <Item>
                <Co.Card.Feature
                  img={item.img}
                  title={item.title}
                  text={item.text}
                />
              </Item>
            );
          })}
        </Mui.Grid>
      </Mui.Stack>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.section`
    min-height: 300px;
    margin-top: 40px;
    display: block;
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

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} md={6} lg={4}>
      <Mui.Stack alignItems={"center"}>{children}</Mui.Stack>
    </Mui.Grid>
  );
};

const data = [
  {
    text: " Nền tảng đảm bảo việc học trực tuyến của học sinh, dạy trực tuyến của giáo viên, và khả năng tương tác trong quá trình dạy-học. ",
    img: "11",
    title: "Dạy học trực tuyến",
  },
  {
    text: "Công tác kiểm tra, khảo thí trực tuyến định kỳ với công nghệ chống gian lận, đảm bảo công bằng, khách quan.",
    img: "22",
    title: "Ôn tập và khảo thí trực tuyến",
  },
  {
    text: "Hỗ trợ giáo viên xây dựng bài giảng số tương tác theo đúng quy định và thuận tiện kiểm định chuyên môn với công nghệ H5P.",
    img: "55",
    title: "Học liệu trực tuyến",
  },
  {
    text: " Đảm bảo hồ sơ dạy học trực tuyến được bảo quản và lưu trữ với độ bảo mật cao bằng công nghệ điện toán đám mây.",
    img: "331",
    title: "Quản lý và lưu trữ hồ sơ dạy học trực tuyến",
  },
  {
    text: " Hệ thống EBD LMS cung cấp giải pháp lớp học trực tuyến tích hợp Zoom/Google Meet/MS Team, có tốc độ và đường truyền ổn định",
    img: "441",
    title: "Lớp học trực tuyến",
  },
  {
    text: " EBD LMS cung cấp hệ thống bài giảng số có sẵn theo chuẩn sách giáo khoa với hình thức trình bày sinh động, thu hút, có tính tương tác cao với học sinh.",
    img: "66",
    title: "Bài giảng số chuẩn",
  },
];
