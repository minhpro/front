import * as Sui from "components";
import React from "react";
import styled from "styled-components";

export const NavSystemPage = ({ name, choose, ...rest }) => {
  return (
    <Style.Wrapper choose={choose} {...rest}>
      <Sui.Text.Body.Medium>{name || "name"}</Sui.Text.Body.Medium>
    </Style.Wrapper>
  );
};

const Style = {
  Wrapper: styled.div`
    position: relative;
    display: inline-block;
    color: ${(props) => (props.choose ? "var(--bs-primary)" : null)};
    cursor: pointer;
    margin-right: 10px;

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      transform: ${(props) => (props.choose ? "scaleX(1)" : "scaleX(0)")};
      height: 3px;
      bottom: 0;
      left: 0;
      background-color: var(--bs-primary);
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
    :hover {
      color: var(--bs-primary);
      transform: translateY(-3px);

      ::after {
        transform: scaleX(1);
        transform-origin: bottom left;
      }
    }
  `,
};
