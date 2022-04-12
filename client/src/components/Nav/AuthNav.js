import React from "react";
import styled from "styled-components";

export const AuthNav = ({ ...rest }) => {
  return (
    <Style.Wrapper {...rest}>
      <h4> Đăng xuất</h4>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.div`
    cursor: pointer;
    :hover {
      transform: translateY(-4px);
    }
  `,
};
