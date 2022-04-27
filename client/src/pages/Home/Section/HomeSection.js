import * as Mui from "@mui/material";
import { getImage } from "functions";
import React from "react";
import styled from "styled-components";

export const HomeSection = () => {
  return (
    <Style.Wrapper className="container">
      <Mui.Grid container>
        <Item>
          <Mui.Stack pt={30} pb={{ xs: 5, md: 20 }}>
            <Style.Title>
              Hệ thống quản lý Học và thi trực tuyến EBD LMS
            </Style.Title>
            <p style={{ maxWidth: "80%" }}>
              Nền tảng dạy và học trực tuyến với đầy đủ các tính năng quản lý
              học liệu và trường lớp, đáp ứng tất cả các nhu cầu của nhà trường,
              giáo viên và học sinh.
            </p>
          </Mui.Stack>
        </Item>
        <Item>
          <Mui.Stack
            alignItems={"center"}
            justifyContent={"flex-end"}
            sx={{ position: "relative", zIndex: 2, height: "100%" }}
          >
            <Mui.Stack
              width={{ xs: "90%", md: "90%" }}
              sx={{
                position: "absolute",
                zIndex: 0,
                bottom: 30,
                left: 0,
              }}
            >
              <Style.HeroImg src={getImage.getPng("hero-shape-purple")} />
            </Mui.Stack>
            <Mui.Stack
              width={{ xs: "90%", md: "60%" }}
              sx={{ position: "relative", zIndex: 1 }}
            >
              <Style.HeroImg src={getImage.getPng("hero-021")} />
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
    background-color: #fcf0f1;
  `,

  Title: styled.h2`
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
    <Mui.Grid item xs={12} md={6}>
      {children}
    </Mui.Grid>
  );
};
