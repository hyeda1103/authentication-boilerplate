import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "./../auth/helper";
import styled from "styled-components";

const Layout = ({ children, history, match }) => {
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "red" };
    } else {
      return { color: "#000" };
    }
  };
  const nav = () => {
    return (
      <ul>
        <li>
          <Link to="/" style={isActive("/")}>
            홈
          </Link>
        </li>
        {!isAuth() && (
          <>
            <li>
              <Link to="/signup" style={isActive("/signup")}>
                SignUp
              </Link>
            </li>
            <li>
              <Link to="/signin" style={isActive("/signin")}>
                SignIn
              </Link>
            </li>
          </>
        )}
        {isAuth() && (
          <li>
            <LogoutLink
              onClick={() => {
                signout(() => {
                  history.push("/");
                });
              }}
            >
              로그아웃
            </LogoutLink>
          </li>
        )}
      </ul>
    );
  };
  return (
    <>
      {nav()}
      <div>{children}</div>
    </>
  );
};

export default withRouter(Layout);

const LogoutLink = styled.span`
  cursor: pointer;
`;
