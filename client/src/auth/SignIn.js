import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "./helper";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const signinForm = () => {
    const handleChange = (name) => (e) => {
      setValues({ ...values, [name]: e.target.value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      setValues({ ...values, buttonText: "Submitting..." });
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/signin`,
        data: { email, password },
      })
        .then((response) => {
          console.log("SIGNIN SUCCESS", response);
          authenticate(response, () => {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              buttonText: "Submitted!",
            });
            toast.success(`Hey ${response.data.user.name}, Welcome Back`);
          });
        })
        .catch((error) => {
          console.log("SIGNIN ERROR", error.response.data);
          setValues({
            ...values,
            buttonText: "Submit",
          });
          toast.error(error.response.data.error);
        });
    };
    return (
      <form>
        <div>
          <div>Email</div>
          <input type="email" value={email} onChange={handleChange("email")} />
        </div>
        <div>
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <div>
          <button onClick={handleSubmit}>{buttonText}</button>
        </div>
      </form>
    );
  };
  return (
    <Layout>
      <ToastContainer />
      {isAuth() ? <Redirect to="/" /> : null}
      <h1>SignIn</h1>
      {signinForm()}
    </Layout>
  );
};

export default SignIn;
