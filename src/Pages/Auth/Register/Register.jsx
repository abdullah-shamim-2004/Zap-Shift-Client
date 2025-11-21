import React from "react";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegistaion = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistaion)}>
        {" "}
        <fieldset className="fieldset">
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
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
