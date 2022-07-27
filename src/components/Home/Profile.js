import React, { useEffect, useState } from "react";
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

import { authkey } from "../Login/authkey";
import wheelSpin from "../../images/wheelSpinBgrmv.png";
import usdt from "../../images/usdt.png";
import Logo from "../../images/logo.png";
import smallLogo from "../../images/user.png";
import { useSelector, useDispatch } from "react-redux";
import { updateSummary } from "../../store/slice";
import { updateUser } from "../../store/slice";
import { updateDashboardMessage } from "../../store/slice";
import { apiUrl } from "../Login/baseurl";

const Profile = () => {
  const [dashboardData, setDashBoardData] = useState({});
  const [dashboardDataPack, setDashBoardDataPack] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  var dashboard = new FormData();
  dashboard.append("dashboard", "");
  dashboard.append("auth", authkey);
  dashboard.append("logged", localStorage.getItem("auth"));
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
      body: dashboard,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          dispatch(updateSummary(data.message.pack));
          dispatch(updateUser(data.message.user));
          dispatch(updateDashboardMessage(data.message));

          setDashBoardData(data.message);
          setDashBoardDataPack(data.message.pack);
        } else {
          navigate("/login");
        }
      });
  }, []);

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

  const dashboardMessage = useSelector(
    (state) => state.dashboardmessage.message
  );
  return (
    <>
      <div className="container max-w-[1080px] mx-auto">
        <div className="w-full h-[150px] bg-gradient-to-r from-green-500 via-indigo-500 to-blue-600 ... relative rounded-b-[50%]">
          <div className="w-[90%] mx-auto flex justify-center items-center pt-5 text-white">
            <div className="flex gap-5 ">
              <div className="avatar">
                <div className="w-[100px] rounded-full ">
                  {Object.entries(dashboardMessagex).length === 0 ? (
                    <img src={avater} alt="" />
                  ) : (
                    <img
                      src={`/files/badges/${dashboardMessagex.user[0].packid}.png`}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                <h2 className="card-title mt-6">
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
                  ID:{" "}
                  {Object.entries(dashboardMessagex).length === 0
                    ? "user name"
                    : dashboardMessagex.user[0].invite}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto bg-base-200 m-5 p-5 grid grid-cols-2 md:grid-cols-5 gap-5 rounded-lg">
          <Link
            to="/team-report/agent"
            className="flex flex-col items-center text-center"
          >
            <img src={teamReport} alt="" />
            <h1>Team report</h1>
          </Link>

          <Link
            to="/lucky-spin"
            className="flex flex-col items-center text-center"
          >
            <img className="w-10 h-6 rounded " src={wheelSpin} alt="" />

            <h1 className="">Wheel of Fortune</h1>
          </Link>
          <Link
            to="/grab-history"
            className="flex flex-col items-center text-center"
          >
            <img src={history} alt="" />
            <h1>Grabs & Profits History</h1>
          </Link>
          <Link
            to="/personal-info"
            className="flex flex-col items-center text-center"
          >
            <img src={info} alt="" />
            <h1>Profile</h1>
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://support.farfetchedgrab.com/"
          >
            <div className="flex flex-col items-center text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              <h1>Live Support</h1>
            </div>
          </a>
          <Link
            to="/invite-friends"
            className="flex flex-col items-center text-center"
          >
            <img src={inviteFriends} alt="" />
            <h1>Grow your team</h1>
          </Link>

          <Link
            to="/membership"
            className="flex flex-col items-center text-center"
          >
            <img src={vip} alt="" />
            <h1>Membership</h1>
          </Link>

          <Link
            to="/withdrawal-history"
            className="flex flex-col items-center text-center"
          >
            <img src={transection} alt="" />
            <h1>Transaction History</h1>
          </Link>

          <div className="indicator m-auto">
            <Link
              to="/message"
              className="flex flex-col items-center text-center"
            >
              <img src={message} alt="" />
              <small className="indicator-item">
                <small>{dashboardMessagex.notify}</small>
              </small>
              <h1>Inbox</h1>
            </Link>
          </div>

          <div className="indicator m-auto">
            <Link
              to="/rules"
              className="flex flex-col items-center text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                />
              </svg>
              <h1>Rules</h1>
            </Link>
          </div>

          <div
            className="flex flex-col items-center  text-center cursor-pointer"
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

        <div className="w-[90%] mb-24 card mx-auto gap-5 rounded-lg bg-base-200 shadow-xl ">
          <div className="card-body">
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Total Account Balance</h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.asset}
                <img src={usdt} width="22" className="m-1 pt-[1px]" alt="" />
              </h1>
            </div>

            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Available Grab Balance</h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.grab_balance}
                <img src={usdt} width="22" className="m-1 pt-[1px]" alt="" />
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Today's Grab Profit</h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.today_profit}
                <img src={usdt} width="22" className="m-1 pt-[1px]" alt="" />
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Total Grab Profit</h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.totalgrab}
                <img src={usdt} width="22" className="m-1 pt-[1px]" />
              </h1>
            </div>
            <div className="flex justify-between  items-center">
              <div className="flex ">
                <h1 className="text-sm md:text-xl">Staked Balance</h1>
              </div>
              <div className="flex">
                <h1 className="flex text-sm md:text-xl">
                  {dashboardMessagex.locked_asset}
                  <img src={usdt} width="22" className="m-1 pt-[1px]" />
                </h1>
              </div>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Lifetime Staked Profit </h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.stakeProfit}
                <img src={usdt} width="22" className="m-1 pt-[1px]" />
              </h1>
            </div>

            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Lifetime Team Commission</h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.promotion_bonus}
                <img src={usdt} width="22" className="m-1 pt-[1px]" />
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Lifetime Account Profit </h1>
              <h1 className="flex text-sm md:text-xl">
                {dashboardMessagex.stakePlusGrab}{" "}
                <img src={usdt} width="22" className="m-1 pt-[1px]" />
              </h1>
            </div>
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
