import React from "react";
import styled from "styled-components";
import * as Func from "functions";
import * as Mui from "@mui/material";
import * as Sui from "components/Sui";

export const Footer = () => {
  return (
    <Style.Wrapper className="container">
      <Mui.Grid container py={5}>
        <Item>
          <Mui.Stack spacing={5} pr={5}>
            <Sui.SuiLogo.Basic src={Func.getImage.getPng("logo")} />
            <p>
              Hỗ trợ dạy - học và đánh giá, kiểm tra trực tuyến dành riêng cho
              các đơn vị giáo dục phổ thông.
            </p>
          </Mui.Stack>
        </Item>
        <Item>
          <Mui.Grid container>
            {data.map((data, i) => {
              return (
                <Mui.Grid xs={6}>
                  <NavParent title={data.title} key={i}>
                    {data.nav.map((nav, i) => {
                      return <p key={i}>{nav.name}</p>;
                    })}
                  </NavParent>
                </Mui.Grid>
              );
            })}
          </Mui.Grid>
        </Item>
        <Item>
          <NavParent title={"Kết nối với chúng tôi"} />
        </Item>
      </Mui.Grid>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.header`
    min-height: 230px;
    background-color: #edeef3;
    display: flex;
    flex-direction: column;
    margin-top: 10rem;
    h1 {
      color: white;
    }
  `,
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} md={6} xl={4}>
      {children}
    </Mui.Grid>
  );
};

const NavParent = ({ title, children }) => {
  return (
    <Mui.Stack spacing={3}>
      <h3>{title || "title"}</h3>
      <Mui.Stack spacing={1}>{children}</Mui.Stack>
    </Mui.Stack>
  );
};

const data = [
  {
    title: "Ve chung toi",
    nav: [{ name: "Gioi thieu" }, { name: "Ho tro" }, { name: "Lien he" }],
  },
  {
    title: "Lien ket",
    nav: [
      { name: "Huong dan" },
      { name: "Cau hoi thuong gap" },
      { name: "ho tro" },
    ],
  },
];
