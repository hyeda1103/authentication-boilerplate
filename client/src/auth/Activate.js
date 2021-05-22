import React, { useState, useEffect } from "react";
import Layout from "./../core/Layout";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    // console.log(token);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, show } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        setValues({
          ...values,
          show: false,
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNUP ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <>
      <h1>Hey {name} Ready to activate your account?</h1>
      <button onClick={handleSubmit}> Activate Account</button>
    </>
  );
  return (
    <Layout>
      <ToastContainer />
      {activationLink()}
    </Layout>
  );
};

export default Activate;