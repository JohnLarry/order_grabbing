import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { TbEdit } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../files/Logo.png";
import { authkey, logged } from "../Login/authkey";
import { apiUrl } from "../Login/baseurl";
const RecoverPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [recoveryPass, setRecoveryPass] = useState(true);
  const [withdrawPassword, setWithdrawPassword] = useState(false);
  const [smsField, setSmsField] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [verifyCode, setVerifyCode] = useState(0);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmCharges, setConfirmCharges] = useState(false);
  const [agreedForCharges, setAgreedForCharges] = useState(false);
  const RecoveryPassSubmit = async (data) => {
    const RecoverPassword = new FormData();
    RecoverPassword.append("username", data.username);
    RecoverPassword.append("phone", data.phone);
    RecoverPassword.append("auth", authkey);
    RecoverPassword.append("step", "1");
    RecoverPassword.append("recover", "");
    setUsername(data.username);
    setPhone(data.phone);
    setIsLoading(true);

    fetch(apiUrl, {
      method: "POST",
      body: RecoverPassword,
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        if (data.status == 200 && data.message.step == "askSecret") {
          setRecoveryPass(false);
          setWithdrawPassword(true);
          setIsLoading(false);
        } else if (data.status == 200) {
          setConfirmCharges(true);
          setIsLoading(false);
          if (agreedForCharges) {
            setAgreedForCharges(false);
            setRecoveryPass(false);
            setSmsField(true);
            setVerifyCode(data.message.code);
          }
        } else {
          toast.error(data.message);
          setIsLoading(false);
        }
      });
    //setRecoveryPass(false);
    //setWithdrawPassword(true);
  };
  const WithdrawPasswordSubmit = async (data) => {
    const RecoverPassword = new FormData();
    RecoverPassword.append("username", username);
    RecoverPassword.append("phone", phone);
    RecoverPassword.append("secret", data.withdraw_password);
    RecoverPassword.append("auth", authkey);
    RecoverPassword.append("step", "2");
    RecoverPassword.append("recover", "");
    setIsLoading(true);
    fetch(apiUrl, {
      method: "POST",
      body: RecoverPassword,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setConfirmCharges(true);
          setIsLoading(false);
          if (agreedForCharges) {
            setAgreedForCharges(false);
            setWithdrawPassword(false);
            setVerifyCode(data.message.code);
            setSmsField(true);
          }
        } else {
          toast.error(data.message);
          setIsLoading(false);
        }
      });
  };
  const SMSSubmit = async (data) => {
    setIsLoading(true);
    if (verifyCode == data.smscode) {
      setSmsField(false);
      setNewPass(true);
      setIsLoading(false);
    } else {
      toast.error("SMS code is not correct");
      setIsLoading(false);
    }
  };
  const NewPassSubmit = async (data) => {
    const RecoverPassword = new FormData();
    RecoverPassword.append("username", username);
    RecoverPassword.append("phone", phone);
    RecoverPassword.append("newPass", data.password);
    RecoverPassword.append("auth", authkey);
    RecoverPassword.append("step", "3");
    RecoverPassword.append("recover", "");
    setIsLoading(true);

    fetch(apiUrl, {
      method: "POST",
      body: RecoverPassword,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setNewPass(false);
          setRecoveryPass(true);
          toast.success(data.message);
          setIsLoading(false);
        } else {
          toast.error(data.message);
          setIsLoading(false);
        }
      });
  };

  var logoutUser = new FormData();
  logoutUser.append("logged", localStorage.getItem("auth"));
  logoutUser.append("auth", authkey);
  logoutUser.append("login", "1");
  useEffect(() => {
    fetch(apiUrl, {
      method: "POST",
      body: logoutUser,
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        if (data.status == 300) {
          navigate("/");
        }
      });
  }, []);
  const closeModal = () => {
    setConfirmCharges(false);
  };
  const sayYes = () => {
    setAgreedForCharges(true);
    closeModal();
  };
  const backToStart = () => {
    setRecoveryPass(true);
    setWithdrawPassword(false);
    setSmsField(false);
    setNewPass(false);
  };
  return (
    <div className="container max-w-[1080px] mx-auto p-5">
      <div className="flex flex-col items-center mt-28">
        <img src={logo} alt="" />
        <h1 className="text-2xl font-bold text-dark">Account Recovery</h1>
      </div>

      {confirmCharges && (
        <>
          <label
            htmlFor="my-modal-3"
            className="btn modal-button btn-ghost"
          ></label>

          <input
            type="checkbox"
            id="my-modal-3"
            checked={confirmCharges}
            className="modal-toggle"
          />
          <div className="modal p-5">
            <div className="modal-box relative">
              <label
                id="closeloginpass1"
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2 "
                onClick={closeModal}
              >
                ✕
              </label>
              <h1 className="text-2xl mt-5 pt-5">
                You will be charged 0.10$ for the SMS
              </h1>
              <p className="mt-10">Do you want to proceed?</p>
              <div className="flex gap-5 mt-5">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-error"
                  onClick={closeModal}
                >
                  NO
                </label>
                <label
                  for="my-modal-4"
                  className="btn btn-primary"
                  onClick={sayYes}
                >
                  YES
                </label>
              </div>
            </div>
          </div>
        </>
      )}
      {recoveryPass && (
        <div className="card-body max-w-[400px] mx-auto">
          <form onSubmit={handleSubmit(RecoveryPassSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Please Enter Your Username"
                className="input input-bordered"
                {...register("username", {
                  required: true,
                })}
              />
              {errors.userName && <p>User name is required</p>}
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
                  <span>Finding...</span>
                </div>
              ) : (
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Find my account"
                />
              )}
            </div>
          </form>
          <ToastContainer />
          <p>
            Remembered password?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      )}
      {withdrawPassword && (
        <div className="card-body max-w-[400px] mx-auto">
          <form onSubmit={handleSubmit(WithdrawPasswordSubmit)}>
            <div
              className="flex justify-end cursor-pointer"
              onClick={backToStart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Back to start</span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Withdraw password</span>
              </label>
              <input
                type="number"
                placeholder="Please Enter Your Withdraw Password"
                className="input input-bordered"
                {...register("withdraw_password", {
                  required: true,
                })}
              />
              {errors.withdraw_password && (
                <p>Withdrawal password is required</p>
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
                  <span>Loading...</span>
                </div>
              ) : (
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Continue"
                />
              )}
            </div>
          </form>
          <ToastContainer />
          <p>
            Remembered password?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      )}
      {smsField && (
        <div className="card-body max-w-[400px] mx-auto">
          <form onSubmit={handleSubmit(SMSSubmit)}>
            <div
              className="flex justify-end cursor-pointer "
              onClick={backToStart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Back to start</span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Verification code</span>
              </label>
              <input
                type="text"
                placeholder="Please enter code from your phone"
                className="input input-bordered"
                {...register("smscode", {
                  required: true,
                })}
              />
              {errors.smscode && <p>Verification is required</p>}
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
                  <span>Loading...</span>
                </div>
              ) : (
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Continue"
                />
              )}
            </div>
          </form>
          <ToastContainer />
          <p>
            Remembered password?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      )}
      {newPass && (
        <div className="card-body max-w-[400px] mx-auto">
          <form onSubmit={handleSubmit(NewPassSubmit)}>
            <div
              className="flex justify-end cursor-pointer"
              onClick={backToStart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Back to start</span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">New password</span>
              </label>
              <input
                type="text"
                placeholder="Please enter new password"
                className="input input-bordered"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && <p>New password is required</p>}
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
                  <span>Confirming...</span>
                </div>
              ) : (
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Confirm"
                />
              )}
            </div>
          </form>
          <ToastContainer />
          <p>
            Remembered password?{" "}
            <Link to="/login" className="text-primary">
              Login here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default RecoverPassword;
