import axios from "axios";
import React from "react";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});
const useSecure = () => {
  return axiosSecure;
};

export default useSecure;
