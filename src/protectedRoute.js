import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const auth = localStorage.getItem("auth");

  return auth != null ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
