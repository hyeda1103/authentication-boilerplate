import React from "react";
import styled from "styled-components";

const Private = () => {
  return (
    <Main>
      <Title>사적인 페이지</Title>
    </Main>
  );
};

export default Private;

const Main = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 4px;
`;
