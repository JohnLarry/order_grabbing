import React, { useEffect, useRef, useState } from "react";
import avater from "../../images/avater.png";
import { useSelector, useDispatch } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { authkey } from "../Login/authkey";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { updateDashboardMessage } from "../../store/slice";

const PersonalInfo = () => {
  const user = useSelector((state) => state.user.data);
  const [verify, setVerify] = useState();
  const navigate = useNavigate();
  const verifyRef = useRef("");
  const withdrawRef = useRef("");
  const addressRef = useRef("");
  const withdrawalRef = useRef("");
  const dispatch = useDispatch();
  var dashboard = new FormData();
  dashboard.append("dashboard", "");
  dashboard.append("auth", authkey);
  dashboard.append("logged", localStorage.getItem("auth"));
  useEffect(() => {
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: dashboard,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          dispatch(updateDashboardMessage(data.message));
        }
      });
  }, []);
  const handleVerify = () => {
    var verifyCode = new FormData();
    verifyCode.append("auth", authkey);
    verifyCode.append("logged", localStorage.getItem("auth"));
    verifyCode.append("send_otp", "");

    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: verifyCode,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setVerify(data);
        }
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = async (data) => {
    const verifyMessage = data.verification;
    const loginPass = data.newLoginPass;

    if (verifyMessage == verify?.message?.code) {
      var loginPassChange = new FormData();
      loginPassChange.append("auth", authkey);
      loginPassChange.append("logged", localStorage.getItem("auth"));
      loginPassChange.append("profile", "");
      loginPassChange.append("set_login", "");
      loginPassChange.append("login", loginPass);

      fetch("https://mining-nfts.com/api/", {
        method: "POST",
        body: loginPassChange,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {
            reset();
            toast.success(data.message);
            navigate("/profile");
          }
        });
    } else {

    }
  };
  const handleWithdrawVerify = (e) => {
    e.preventDefault();
    const verifyWithdraw = verifyRef.current.value;
    const newWithdrawPass = withdrawRef.current.value;
    if (verifyWithdraw == verify?.message?.code) {
      var withdrawPassChange = new FormData();
      withdrawPassChange.append("auth", authkey);
      withdrawPassChange.append("logged", localStorage.getItem("auth"));
      withdrawPassChange.append("profile", "");
      withdrawPassChange.append("set_code", "");
      withdrawPassChange.append("code", newWithdrawPass);

      fetch("https://mining-nfts.com/api/", {
        method: "POST",
        body: withdrawPassChange,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == 200) {          
            toast.success(data.message);
            navigate("/profile");
          } 
        });
    } else {
     
    }
  };
  const handleAddress = (e) => {
    e.preventDefault();
    const addressChange = addressRef.current.value;
    const withdrawalPass = withdrawalRef.current.value;

    if (withdrawalPass == user[0]?.secret_key) {
      var changeAddress = new FormData();
      changeAddress.append("auth", authkey);
      changeAddress.append("logged", localStorage.getItem("auth"));
      changeAddress.append("profile", "");
      changeAddress.append("set_usdt", "");
      changeAddress.append("address", addressChange);

      fetch("https://mining-nfts.com/api/", {
        method: "POST",
        body: changeAddress,
      })
        .then((res) => res.json())
        .then((data) => {
        

          if (data.status == 200) {
         
            toast.success(data.message);
            navigate("/profile");
          }  
        });
    }
  };

  return (
    <div className="container max-w-[1080px] mx-auto ">
        <div className="bg-base-200 px-4 py-2 rounded-xl my-5 mx-3 flex items-center justify-between">
        <Link to="/" className="btn btn-base-200 rounded-full px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg> Back
        </Link>
        <h1 className="text-xl font-bold text-center">Profile </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="card mx-auto bg-base-200 shadow-xl w-full">
          <div className="card-body">
            <div className="flex gap-5 mb-5">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={avater} alt="" />
                </div>
              </div>
              <div>
                <h2 className="card-title">{user[0].username}</h2>
                <p>total assets: {user[0].main_balance}</p>
              </div>
            </div>

            <div className="flex justify-between">
              <h1>Real name</h1>
              <h1>{user[0].name}</h1>
            </div>
            <hr />
            <div className="flex justify-between">
              <h1>Phone Number</h1>
              <h1>{user[0].phone}</h1>
            </div>

            <hr />
            <p className="text-error mt-5">
              The info above cannot be changed once submitted. Should you have
              any further questions, please contact customer service.
            </p>
          </div>
        </div>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h1 className="card-title">Set Password</h1>
            <div className="flex justify-between">
              <h1>Change Login Password</h1>
              <label
                htmlFor="my-modal-3"
                className="btn modal-button btn-ghost"
              >
                <TbEdit className="text-2xl text-error "></TbEdit>
              </label>

              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal p-5">
                <div className="modal-box relative">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h1 className="text-2xl">
                    You will be charged 0.10$ for the SMS
                  </h1>
                  <p className="mt-10">Do you want to proceed?</p>
                  <div className="flex gap-5 mt-5">
                    <label htmlFor="my-modal-3" className="btn btn-error">
                      NO
                    </label>
                    <label
                      onClick={handleVerify}
                      for="my-modal-4"
                      className="btn btn-primary"
                    >
                      YES
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label for="my-modal-4" className="modal cursor-pointer">
              <label className="modal-box relative" for="">
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-2xl text-center font-bold mb-5">
                  Change Login Password
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                    <input
                      type="number"
                      placeholder="New Login Password"
                      className="input input-bordered mb-5"
                      {...register("newLoginPass", {
                        required: true,
                      })}
                    />
                    {errors.newLoginPass && <p>Login Password is required</p>}
                  </div>
                  <div className="form-control">
                    <input
                      type="number"
                      placeholder="Verification Code"
                      className="input input-bordered"
                      {...register("verification", {
                        required: true,
                      })}
                    />
                    {errors.verification && <p>Verification is required</p>}
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Verify"
                    />
                  </div>
                </form>
              </label>
            </label>

            <div className="flex justify-between">
              <h1>Change Withdrawal Password</h1>
              <label htmlFor="my-modal" className="btn modal-button btn-ghost">
                <TbEdit className="text-2xl text-error "></TbEdit>
              </label>

              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <label
                    htmlFor="my-modal"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h1 className="text-2xl">
                    You will be charged 0.10$ for the SMS
                  </h1>
                  <p className="mt-10">Do you want to proceed?</p>
                  <div className="flex gap-5 mt-5">
                    <label htmlFor="my-modal" className="btn btn-error">
                      NO
                    </label>
                    <label
                      onClick={handleVerify}
                      for="my-modal-6"
                      className="btn btn-primary"
                    >
                      YES
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <label
                  htmlFor="my-modal-6"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-2xl text-center font-bold mb-5">
                  Withdrawal Verification Code
                </h3>
                <form onSubmit={handleWithdrawVerify}>
                  <div>
                    <input
                      ref={withdrawRef}
                      type="number"
                      placeholder="New Withdrawal Password"
                      className="input input-bordered w-full mb-5"
                      required
                    />
                  </div>
                  <div>
                    <input
                      ref={verifyRef}
                      type="number"
                      placeholder="Verification Code"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Verify"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="flex justify-between">
              <h1>Change USDT Address</h1>
              <label
                htmlFor="my-modal-7"
                className="btn modal-button btn-ghost"
              >
                <TbEdit className="text-2xl text-error "></TbEdit>
              </label>
              <input type="checkbox" id="my-modal-7" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box max-w-[600px]">
                  <label
                    htmlFor="my-modal-7"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-2xl text-center font-bold mb-5">
                    Change USDT Address
                  </h3>
                  <form onSubmit={handleAddress}>
                    <div>
                      <input
                        ref={addressRef}
                        type="number"
                        placeholder="Change your USDT address"
                        className="input input-bordered w-full mb-5"
                        required
                      />
                    </div>
                    <div>
                      <input
                        ref={withdrawalRef}
                        type="number"
                        placeholder="Withdrawal password"
                        className="input input-bordered w-full "
                        required
                      />
                    </div>
                    <div className="form-control mt-6">
                      <input
                        className="btn btn-primary"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfo;
