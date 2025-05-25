import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, role }) => {
  const { isLoginIn, user } = useSelector((state) => state.auth);

  if (!user) {
    return window.location.replace("/");
  }

  if (!isLoginIn && !user.user.token) {
    return window.location.replace("/unauthorized");
  }

  return children;
};

export default ProtectedRoute;
