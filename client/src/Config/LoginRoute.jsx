import React from "react";
import { Navigate } from "react-router-dom";

const isLoginAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  return user && token;
};

const LoginRoute = ({ children }) => {
  return !isLoginAuthenticated() ? children : <Navigate to="/" replace />;
};

export default LoginRoute;
