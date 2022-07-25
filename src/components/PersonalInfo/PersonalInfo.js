import React, { useEffect, useRef, useState } from "react";
import avater from "../../images/avater.png";
import { useSelector, useDispatch } from "react-redux";
import { TbEdit } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { authkey } from "../Login/authkey";
import { useForm } from "react-hook-form";
import { updateUser } from "../../store/slice";
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

          dispatch(updateUser(data.message.user));

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
        } else if (data.status == 100) {
          toast.error(data.message);
        }
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,

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
      //  
      fetch("https://mining-nfts.com/api/", {
        method: "POST",
        body: loginPassChange,
      })
        .then((res) => res.json())
        .then((data) => {

          if (data.status == 200) {
            //close modal
            document.getElementById("closeloginpass").click();
            document.getElementById("closeloginpass1").click();

            toast.success(data.message);

          } else if (data.status == 100) {
            toast.error(data.message);
          } else {
            navigate("/login");
          }
        });
    } else {
      toast.error("Invalid verification code");
    }

  };

  const onSubmit1 = async (data) => {
    const verifyMessage = data.newWithdrwcode;
    const loginPass = data.newWithdrwPass;

    if (verifyMessage == verify?.message?.code) {
      var loginPassChange = new FormData();
      loginPassChange.append("auth", authkey);
      loginPassChange.append("logged", localStorage.getItem("auth"));
      loginPassChange.append("profile", "");
      loginPassChange.append("set_code", "");
      loginPassChange.append("code", loginPass);
      //  
      fetch("https://mining-nfts.com/api/", {
        method: "POST",
        body: loginPassChange,
      })
        .then((res) => res.json())
        .then((data) => {

          if (data.status == 200) {
            //close modal
            document.getElementById("closeloginpass2").click();
            document.getElementById("closeloginpass3").click();

            toast.success(data.message);

          } else if (data.status == 100) {
            toast.error(data.message);
          } else {
            navigate("/login");
          }
        });
    } else {
      toast.error("Invalid verification code");
    }

  };

  const handleAddress = (e) => {

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

          } else if (data.status == 100) {
            toast.error(data.message);
          } else {
            navigate("/login");
          }
        });
    } else {
      toast.error("Invalid Withdrawal Password");
    }
  };

  const validateUsdtAddress = (e) => {
    e.preventDefault();
    var usdtaddres = document.getElementById('usdtaddres').value;
    if (usdtaddres == "") {
      toast.error('Address can not be empty');
    } else if (usdtaddres.length != 34) {
      toast.error('This is not a valid USDT TRC20 address!');
    } else if (usdtaddres.charAt(0) != 'T') {
      toast.error('This is not a valid USDT TRC20 address!');
    } else {
      //continue
      handleAddress(e);
    }

  }

  const mask = (cardnumber) => {
    if (cardnumber.length < 10) {
      return cardnumber;
    } else {
      var first4 = cardnumber.substring(0, 4);
      var last5 = cardnumber.substring(cardnumber.length - 5);
      return first4 + "****" + last5;
    }




  }

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

      <div className="mx-3">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="card mx-auto bg-base-200 shadow-xl w-full">
            <div className="card-body">
              <div className="flex gap-5 mb-5">
                <div className="avatar">
                  <div className="w-16 rounded-full ">
                    {

                      Object.entries(user[0]).length === 0
                        ? <img src={avater} alt="" />
                        : <img src={`/files/badges/${user[0].packid}.png`} alt="" />
                    }
                  </div>
                </div>
                <div className=" mt-4">
                  <h2 className="card-title">{user[0].username}</h2>

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
                any further questions, please contact Live Support.</p>
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
                      id="closeloginpass1"
                      htmlFor="my-modal-3"
                      className="btn btn-sm btn-circle absolute right-2 top-2 "
                    >
                      ✕
                    </label>
                    <h1 className="text-2xl mt-5 pt-5">
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
                    id="closeloginpass"
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
                        type="text"
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
                      id="closeloginpass2"
                      htmlFor="my-modal"
                      className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                      ✕
                    </label>
                    <h1 className="text-2xl mt-5 pt-5">
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
                    id="closeloginpass3"
                    htmlFor="my-modal-6"
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                  >
                    ✕
                  </label>
                  <h3 className="text-2xl text-center font-bold mb-5 mt-5 pt-5">
                    Withdrawal Verification Code
                  </h3>
                  <form onSubmit={handleSubmit2(onSubmit1)}>
                    <div>
                      <input

                        type="number"
                        placeholder="New Withdrawal Password"
                        className="input input-bordered w-full mb-5"
                        {...register2("newWithdrwPass", {
                          required: true,
                        })}
                      />
                      {errors2.newWithdrwPass && <p>Withdrawal Password is required</p>}
                    </div>
                    <div>
                      <input

                        type="number"
                        placeholder="Verification Code"
                        className="input input-bordered w-full"
                        {...register2("newWithdrwcode", {
                          required: true,
                        })}
                      />
                      {errors2.newWithdrwcode && <p>Verification code is required</p>}
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
                <div>
                  <h1 className="">Change USDT Address</h1>
                  <span> {mask(user[0].usdt_address)}</span>
                </div>
                {/* [0].usdt_address */}
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
                    <h3 className="text-2xl text-center font-bold mb-5 mt-5 pt-5">

                      Add/Change USDT Address
                    </h3>
                    <form onSubmit={validateUsdtAddress}>
                      {/* handleAddress */}
                      <div>
                        <input
                          id="usdtaddres"

                          ref={addressRef}
                          type="text"
                          placeholder="Change your USDT address"
                          className="input input-bordered w-full mb-5"

                        />
                      </div>
                      <div>
                        <input
                          ref={withdrawalRef}
                          type="number"
                          placeholder="Withdrawal password"
                          className="input input-bordered w-full "

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
      </div>
      <ToastContainer />
    </div>
  );
};

export default PersonalInfo;
