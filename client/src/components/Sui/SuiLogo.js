import React from "react";
import styled from "styled-components";

export const SuiLogo = () => {
  return <div>SuiLogo</div>;
};

SuiLogo.Basic = function ({ src, height }) {
  return (
    <Style.Wrapper height={height}>
      <img src={src} alt="logo" />
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.div`
    height: ${(props) => props.height || "2rem"};
    width: "auto";
  `,
};
