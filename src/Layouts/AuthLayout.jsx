import React from "react";
import Logo from "../Components/Logo/Logo";
import AuthImg from "../assets/authImage.png";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Logo></Logo>
      <div className="flex items-center mx-auto my-5">
        <div className="flex-1 ">
          <Outlet></Outlet>
        </div>
        <div className="flex-1 ">
          <img src={AuthImg} alt="Auth image" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
