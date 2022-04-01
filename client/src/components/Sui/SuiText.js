import React from "react";
import styled from "styled-components";

export const SuiText = () => {
  return <div>SuiText</div>;
};

SuiText.SmallText = styled.p`
  font-size: 13px;
  font-family: ${(props) => props.theme.fonts.main};
`;
