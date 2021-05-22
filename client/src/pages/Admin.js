import React from "react";
import styled from "styled-components";

const Admin = () => {
  return (
    <Main>
      <Title>관리 페이지</Title>
    </Main>
  );
};

export default Admin;

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
