import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../SocialLogin/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistaion = (data) => {
    // bring the profile image from react form data photo[0]
    const profileImg = data.photo[0];
    // Create user with email and password
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        //1. Store the image in Form data
        const formData = new FormData();
        formData.append("image", profileImg);
        //2. send the photo to imbb to upload and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload ", res.data.data.url);
          //update user Profile to firebase
          const profile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(profile)
            .then(() => {
              console.log("User Profile Updated.");
              navigate(location.state || "/");
            })
            .catch((error) => console.log(error));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="card   bg-base-100 ms-auto w-full  lg:max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h2 className="text-2xl font-semibold text-center py-1">
          Welcome Back
        </h2>
        <p className="text-center ">Register with ZapShift</p>
        <form onSubmit={handleSubmit(handleRegistaion)}>
          {" "}
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input"
              placeholder="Your name"
            />
            {/* error massage for Name */}
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
            {/* Image/ Photo */}
            <label className="label">Image</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input"
              placeholder="Your name"
            />
            {/* error massage for Photo */}
            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
            )}
            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {/* error massage for email */}
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
              })}
              className="input"
              placeholder="Password"
            />
            {/* Error massage for password */}
            {errors.password?.type == "required" && (
              <p className="text-red-500">Passsword is required</p>
            )}
            {errors.password?.type == "minLength" && (
              <p className="text-red-500">
                Passsword must to be atleast 6 charecters or longer.
              </p>
            )}
            {errors.password?.type == "pattern" && (
              <p className="text-red-500">
                Password must contain at least one uppercase, one lowercase, one
                number.
              </p>
            )}
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-neutral mt-4">Register</button>{" "}
            <p className="text-md font-semibold text-center my-1.5">
              Have an account ?{" "}
              <Link
                state={location?.state}
                className="text-primary"
                to="/auth/login"
              >
                Login
              </Link>{" "}
            </p>
          </fieldset>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
