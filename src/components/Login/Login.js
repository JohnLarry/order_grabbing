import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../files/Logo.png";
import { authkey, logged } from "./authkey";
import { apiUrl } from "./baseurl";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    var login = new FormData();
    login.append("username", data.username);
    login.append("password", data.password);
    login.append("auth", authkey);
    login.append("login", "1");

    fetch(apiUrl, {
      method: "POST",
      body: login,
    })
      .then((res) => res.json())
      .then((data) => {
       
        reset();
        if (data.status == 200) {
          localStorage.setItem("auth", data.message);
          navigate("/");
        } else if (data.status == 100) {
          toast.error(data.message);
         
        } else if (data.status == 300) {
          toast.dark(data.message);
        }
      });
  };
  const loginedCheck = localStorage.getItem("auth");

  useEffect(() => {
    if (loginedCheck != null) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container max-w-[1080px] mx-auto p-5">
      <div className="flex flex-col items-center mt-28">
        <img src={logo} alt="" />
        <h1 className="text-2xl font-bold text-white">SHEIN ASSISTANT</h1>
      </div>
      <div className="card-body max-w-[400px] mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Please Enter 6~12 letters or numbers"
              className="input input-bordered"
              {...register("username", {
                required: true,
              })}
            />
            {errors.userName && <p>User name is required</p>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Please enter the password"
              className="input input-bordered"
              {...register("password", { required: true })}
            />
            {errors.password && <p>Password is required</p>}
          </div>

          <div className="form-control mt-6">
            <input
              className="btn btn-primary"
              type="submit"
              value="Login Now"
            />
          </div>
        </form>
        <ToastContainer />
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-primary">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
