import * as Mui from "@mui/material";
import React from "react";
import styled from "styled-components";
import * as Co from "components";

export const LinkWrapperSection = () => {
  return (
    <Style.Wrapper className="container">
      <Mui.Grid container>
        {data.map((item, i) => {
          return (
            <Item key={i}>
              <Co.Card.LinkLms
                name={item.name}
                link={item.link}
                icon={item.icon}
              />
            </Item>
          );
        })}
      </Mui.Grid>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.section`
    min-height: 300px;
    margin-top: 40px;
    width: 100%;
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
    <Mui.Grid xs={12} md={6} lg={4} xl={3} xxl={2}>
      {children}
    </Mui.Grid>
  );
};

const data = [
  { name: "Giáo viên", link: "/khao-thi", icon: "teacher" },
  { name: "Học sinh", link: "/khao-thi/danh-sach-bai-thi", icon: "hoc-sinh" },
];
