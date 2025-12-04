import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});
const useSecure = () => {
  const { user, UserSignOut } = useAuth();
  const token = user?.accessToken;
  const navigate = useNavigate();

  // console.log(user.accessToken);

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    //response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          UserSignOut().then(() => {
            navigate("/auth/login");
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [token, UserSignOut, navigate]);
  return axiosSecure;
};

export default useSecure;
