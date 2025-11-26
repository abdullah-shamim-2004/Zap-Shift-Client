import React from "react";
import Logo from "../../../Components/Logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { FaUserCircle } from "react-icons/fa";
// import Logo from "../../../Components/Logo/Logo";

const Navbar = () => {
  const { user, UserSignOut } = useAuth();
  const links = (
    <>
      <li>
        <NavLink>Service</NavLink>
      </li>
      <li>
        <NavLink to="/send-parcel">Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">coverage</NavLink>
      </li>

      <li>
        <NavLink>About Us</NavLink>
      </li>
    </>
  );
  const handleSignOut = () => {
    UserSignOut()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        {/* <a className="btn btn-ghost text-xl">Logo</a> */}
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      {/* User Section */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <div>
            <ul className="">
              <li>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline text-black btn-primary btn-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/auth/login" className="btn btn-outline text-black btn-primary btn-sm">
            Login
          </Link>
        )}
        <li>
          <NavLink
            className="btn btn-outline text-white bg-primary btn-sm"
            to="/rider"
          >
            Be a Rider
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
