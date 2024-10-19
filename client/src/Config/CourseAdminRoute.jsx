import React from "react";
import { Navigate } from "react-router-dom";

const isCourseAdminAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user && (user.isCourseAdmin === true || user.role === "admin");
};

const CourseAdminRoute = ({ children }) => {
  return isCourseAdminAuthenticated() ? (
    children
  ) : (
    <Navigate to="/courses/instructor/signup" replace />
  );
};

export default CourseAdminRoute;
