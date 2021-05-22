import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Layout from "./../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isAuth } from "./helper";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

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
            buttonText: "Submitted!",
          });
          toast.success(response.data.message);
        })
        .catch((error) => {
          console.log("SIGNUP ERROR", error.response.data);
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
          <div>Name</div>
          <input type="text" value={name} onChange={handleChange("name")} />
        </div>
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
      <h1>SignUp</h1>
      {signupForm()}
    </Layout>
  );
};

export default SignUp;
