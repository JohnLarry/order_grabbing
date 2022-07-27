import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authkey } from "../Login/authkey";
import { toast } from "react-toastify";
import { apiUrl } from "../Login/baseurl";
const Register = () => {
  const { invitecode } = useParams();
  const navigate = useNavigate();
  const loginedCheck = localStorage.getItem("auth");

  useEffect(() => {
    if (loginedCheck != null) {
      navigate("/");
    }
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const registerUser = async (data) => {
    var registerNewUser = new FormData();
    registerNewUser.append("username", data.username);
    registerNewUser.append("password", data.password);
    registerNewUser.append("phone", data.phone);
    registerNewUser.append("name", data.name);
    registerNewUser.append("referCode", data.referCode);
    registerNewUser.append("auth", authkey);
    registerNewUser.append("register", "");
    setIsLoading(true);
    fetch(apiUrl, {
      method: "POST",
      body: registerNewUser,
    })
      .then((res) => res.json())
      .then((resp) => {
    
        if (resp.status == 200) {
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
        } else if (resp.status == 100) {
          setErrorMessage(resp.message);
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="container max-w-[1080px] mx-auto p-5">
      <h1 className="text-2xl text-center mt-6">Register</h1>
      {errorMessage && (
        <p className="text-red-500 text-center">{errorMessage}</p>
      )}

      <div className="card-body max-w-[400px] mx-auto">
        <form onSubmit={handleSubmit(registerUser)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Invitation Code</span>
            </label>
            <input
              type="text"
              placeholder="Please Enter 6~8 digits invitation code"
              value={invitecode}
              className="input input-bordered"
              {...register("referCode", {
                required: true,
              })}
            />
            {errors.referCode && (
              <small className="text-red-600">
                Invitation code is required
              </small>
            )}
          </div>
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
                maxLength: 12,
                minLength: 3,
              })}
            />
            {errors.username && (
              <small className="text-red-600">User name is required(min 3 max 12 length)</small>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Login password</span>
            </label>
            <input
              type="password"
              placeholder="6~12 digits with english letters and numbers"
              className="input input-bordered"
              {...register("password", {
                required: true,
                maxLength: 12,
                minLength: 6,
              })}
            />
            {errors.password && (
              <small className="text-red-600">Password is required(min 6 max 12 length)</small>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Real name</span>
            </label>
            <input
              type="text"
              placeholder="Please enter real name"
              className="input input-bordered"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <small className="text-red-600">Name is required</small>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone number</span>
            </label>
            <input
              type="number"
              placeholder="Ex: 447700900486 (country code without +)"
              className="input input-bordered"
              {...register("phone", {
                required: true,
              })}
            />
            {errors.phone && (
              <small className="text-red-600">Phone is required</small>
            )}
          </div>
          <div className="form-control mt-6 flex">
            <span>I confirm the information above is correct</span>
            <input
              type="checkbox"
              className="checkbox"
              {...register("acceptedCondition", {
                required: true,
              })}
            />
            {errors.acceptedCondition && (
              <small className="text-red-600">Required</small>
            )}
          </div>

          <div className="form-control mt-6">
            {isLoading ? (
              <div className="btn btn-primary">
                <svg
                  role="status"
                  className="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span>Registering...</span>
              </div>
            ) : (
              <input
                className="btn btn-primary"
                type="submit"
                value="Register"
              />
            )}
          </div>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
