import React from "react";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader></Loader>;
  }
  if (user && user?.email) {
    return children;
  } else {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }
};

export default PrivateRoute;
