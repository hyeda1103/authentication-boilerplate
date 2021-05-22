import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";
import Activate from "./auth/Activate";
import GlobalStyle from "./globalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import Private from "./components/Private";
import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/auth/activate/:token" component={Activate} />
        <PrivateRoute path="/private" component={Private} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
