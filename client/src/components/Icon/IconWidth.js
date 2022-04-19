import React from "react";
import styled from "styled-components";

export const IconWidth = ({ src, alt, w, ...rest }) => {
  return (
    <Style.Wrapper w={w} {...rest}>
      <img src={src} alt={alt} />
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.div`
    display: block;
    width: ${(props) => props.w || "70px"};
    height: auto;
    cursor: pointer;
    :hover {
      transform: scale(1.05);
    }
    img {
      width: 100%;
      height: auto;
    }
  `,
};
