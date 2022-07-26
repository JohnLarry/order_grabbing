import React, { useEffect } from "react";
import avater from "../../images/avater.png";
import { MdEmail } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import info from "../../images/68d5e54.svg";
import deposit from "../../images/fae87e4.svg";
import withdraw from "../../images/a723444.svg";
import history from "../../images/2084950.svg";
import account from "../../images/88ac34a.svg";
import vip from "../../images/cc6e80b.svg";
import transection from "../../images/4a9ab9a.svg";
import teamReport from "../../images/eb36604.svg";
import message from "../../images/81f967c.svg";
import inviteFriends from "../../images/04c663c.svg";
import Navber from "../Navber/Navber";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateDashboardMessage } from "../../store/slice";
import { authkey } from "../Login/authkey";
import wheelSpin from "../../images/wheelSpinBgrmv.png";
import usdt from "../../images/usdt.png";
import { apiUrl } from "../Login/baseurl";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var dashboardProfile = new FormData();
  dashboardProfile.append("dashboard", "");
  dashboardProfile.append("auth", authkey);
  dashboardProfile.append("logged", localStorage.getItem("auth"));

  var logoutUserData = new FormData();
  logoutUserData.append("logout", "");
  logoutUserData.append("auth", authkey);
  logoutUserData.append("logged", localStorage.getItem("auth"));

  useEffect(() => {
    fetch(apiUrl, {
      method: "POST",
      body: dashboardProfile,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          dispatch(updateDashboardMessage(data.message));
        } else {
          navigate("/login");
        }
      });
  }, []);

  var dashboardMessagex = useSelector(
    (state) => state.dashboardmessage.message
  );
  const format = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };
  const logout = () => {
    fetch(apiUrl, {
      method: "POST",
      body: logoutUserData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          localStorage.removeItem("auth");

          navigate("/login");
        }
      });
  };

  return (
    <>
      <div className="container max-w-[1080px] mx-auto">
        <div className="w-full h-[350px] bg-primary relative rounded-b-[50%]">
          <div className="w-[90%] mx-auto flex justify-between items-center pt-12 text-white">
            <div className="flex gap-5 mb-5">
              <div className="avatar">
                <div className="w-12 rounded-full ring ring-secondary ring-offset-white ring-offset-2">
                  <img src={avater} alt="" />
                </div>
              </div>
              <div>
                <h2 className="card-title">
                  {" "}
                  {
                    //dashboardMessage.user[0].username
                    //dashboardMessagex.user[0].username
                    Object.entries(dashboardMessagex).length === 0
                      ? "user name"
                      : dashboardMessagex.user[0].username
                  }
                </h2>
                <p>
                Membership Level:{" "}
                  {Object.entries(dashboardMessagex).length === 0
                    ? "user name"
                    : dashboardMessagex.user[0].invite}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="indicator">
                <Link to="/message" >
                  <span className="indicator-item badge badge-warning rounded-lg">{dashboardMessagex.notify}</span>
                  <div className="grid  place-items-center"><MdEmail className="w-8 h-8"></MdEmail></div>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white w-[90%] mx-auto absolute bottom-0 left-[5%] h-56 rounded-lg">
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-3xl font-bold mb-3 text-slate-900">
              Grab Balance
              </h1>
              <h1 className="text-5xl font-bold text-green-500">
                {Object.entries(dashboardMessagex).length === 0
                  ? "user name"
                  : dashboardMessagex.asset} <img className="inline ml-1 h-[40px] w-[40px]"  src={usdt} alt="" />
              </h1>
            </div>
          </div>
        </div>

        <a target="_blank" rel="noopener noreferrer" href="https://support.farfetchedgrab.com/" ><div className="w-[90%] mx-auto bg-base-200 mt-5 p-5 rounded-lg flex justify-between">
          <div className="flex gap-5 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>  <span>Contact Customer Support </span>
            
           
          </div>
          <AiOutlineArrowRight></AiOutlineArrowRight>
        </div></a>


        <div className="w-[90%] mx-auto bg-base-200 m-5 mb-24 p-5 grid grid-cols-2 md:grid-cols-5 gap-5 rounded-lg">
          <Link to="/personal-info" className="flex flex-col items-center">
            <img src={info} alt="" />
            <h1>Personal info</h1>
          </Link>
          <Link to="/deposit" className="flex flex-col items-center">
            <img src={deposit} alt="" />
            <h1>Deposit</h1>
          </Link>
          <Link to="/withdraw" className="flex flex-col items-center">
            <img src={withdraw} alt="" />
            <h1>Withdraw</h1>
          </Link>
          <Link to="/grab-history" className="flex flex-col items-center">
            <img src={history} alt="" />
            <h1>Order history</h1>
          </Link>
          <Link to="/summary" className="flex flex-col items-center">
            <img src={vip} alt="" />
            <h1>Rank</h1>
          </Link>
          <Link to="/withdrawal-history" className="flex flex-col items-center">
            <img src={transection} alt="" />
            <h1>Transaction</h1>
          </Link>

          <Link to="/team-report/agent" className="flex flex-col items-center">
            <img src={teamReport} alt="" />
            <h1>Team report</h1>
          </Link>
          <Link to="/message" className="flex flex-col items-center">
            <img src={message} alt="" />
            <h1>Message</h1>
          </Link>


          <Link to="/invite-friends" className="flex flex-col items-center">
            <img src={inviteFriends} alt="" />
            <h1>Invite friends</h1>
          </Link>

          <Link to="/lucky-spin" className="flex flex-col items-center">
            <img className="w-10 rounded " src={wheelSpin} alt="" />

            <h1 className="">Lucky Spin</h1>
          </Link>

          <Link to="/lock-history" className="flex flex-col justify-center items-center">
            <img src={account} alt="" />
            <h1>Contract history</h1>
          </Link>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={logout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <h1>Logout</h1>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 99,
        }}
        className="mt-5"
      >
        <Navber></Navber>
      </div>
    </>
  );
};

export default Profile;
