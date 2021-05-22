import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "./helper";
import styled from "styled-components";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const signupForm = () => {
    const handleChange = (name) => (e) => {
      setValues({ ...values, [name]: e.target.value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setValues({ ...values, buttonText: "Submitting..." });
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/signup`,
        data: { name, email, password },
      })
        .then((response) => {
          console.log("SIGNUP SUCCESS", response);
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
          });
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log("SIGNUP ERROR", error.response.data);

          toast.error(error.response.data.error);
        });
    };
    return (
      <AuthBlock>
        <Title>회원가입</Title>
        <FormEl>
          <StyledLabel htmlFor="name">이름</StyledLabel>
          <StyledInput
            id="name"
            type="text"
            value={name}
            onChange={handleChange("name")}
          />
        </FormEl>
        <FormEl>
          <StyledLabel htmlFor="email">이메일</StyledLabel>
          <StyledInput
            id="email"
            type="email"
            value={email}
            onChange={handleChange("email")}
          />
        </FormEl>
        <FormEl>
          <StyledLabel htmlFor="password">비밀번호</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            value={password}
            onChange={handleChange("password")}
          />
        </FormEl>
        <FormEl>
          <Button onClick={handleSubmit}>회원가입</Button>
        </FormEl>
      </AuthBlock>
    );
  };
  return (
    <Main>
      <ToastContainer />
      {isAuth() ? <Redirect to="/" /> : null}
      {signupForm()}
    </Main>
  );
};

export default SignUp;

const Main = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
`;

const AuthBlock = styled.form`
  width: 480px;
  box-sizing: border-box;
  padding: 4rem;
  border: 1px solid #000;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 4px;
`;

const FormEl = styled.div`
  & + & {
    margin-top: 2rem;
  }
`;

const StyledLabel = styled.label`
  display: block;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #00000080;

  &:focus {
    border-bottom: 1px solid #000;
  }
`;

const Button = styled.button`
  width: 100%;
  border: 1px solid #000;
  padding: 0.5rem;
  margin: 1.5rem 0;
  font-size: 16px;
  letter-spacing: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  justify-content: center;
  transition: 0.4s ease;

  &:hover {
    background: #000;
    color: #fff;
  }
`;
