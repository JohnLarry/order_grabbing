import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import smallLogo from "../../images/user.png";
import deposit from "../../images/c09a915.svg";
import withdraw from "../../images/5dfa582.svg";
import aboutUs from "../../images/e2c4587.svg";
import rules from "../../images/30da4dc.svg";
import promotion from "../../images/152d578.svg";
import vip from "../../images/101f845.svg";
import inviteFriends from "../../images/8da3f99.svg";

import Navber from "../Navber/Navber";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authkey } from "../Login/authkey";

import { updateSummary } from "../../store/slice";
import { updateUser } from "../../store/slice";
import { updateDashboardMessage } from "../../store/slice";
import teamReport from "../../images/eb36604.svg";
import wheelSpin from "../../images/wheelSpinBgrmv.png";
import account from "../../images/88ac34a.svg";
import { apiUrl } from "../Login/baseurl";

const Home = () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const format = (x) => {
    return Number.parseFloat(x).toFixed(2);
  };
  const dispatch = useDispatch();
  var dashboard = new FormData();

  const navigate = useNavigate();
  dashboard.append("dashboard", "");
  dashboard.append("auth", authkey);
  dashboard.append("logged", localStorage.getItem("auth"));

  const [dashboardData, setDashBoardData] = useState({});
  const [dashboardDataPack, setDashBoardDataPack] = useState([]);

  const [lockFundModal, setLockFundModal] = useState(false);
  const [lockFundSuccess, setLockFundSuccess] = useState(false);
  const [lockFundError, setLockFundError] = useState(false);
  const [fundLockAmount, setFundLockAmount] = useState(0);
  const [daily, setdaily] = useState(0);
  const [month, setmonth] = useState(0);
  const [total, settotal] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  var lock = new FormData();
  lock.append("lock", "");
  lock.append("amount", fundLockAmount);
  lock.append("auth", authkey);
  lock.append("logged", localStorage.getItem("auth"));

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

  const gotoGrabTask = () => {
    
    navigate("/order-grab", window.scrollTo(0, 0));
    
  };
  const addLockFund = () => {
    fetch(apiUrl, {
      method: "POST",
      body: lock,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          setLockFundModal(false);
          setResponseMessage(data.message);
          setLockFundSuccess(true);
        }
        if (data.status == 100) {
          setLockFundModal(false);
          setResponseMessage(data.message);
          setLockFundError(true);
        }
      });
  };
  const showLockFundModal = () => {
    setLockFundModal(true);
  };
  const closeFundModal = () => {
    setLockFundModal(false);
  };
  const closeFundErrorModal = () => {
    setLockFundError(false);
  };
  const closeFundSuccessModal = () => {
    setLockFundSuccess(false);
  };
  const updateFundLock = (e) => {
    e.preventDefault();
    setFundLockAmount(parseInt(e.target.value));
    var percent = 0;
    let amountValue = parseInt(e.target.value);
    if (amountValue === 300) {
      percent = 5.5;
    } else if (amountValue === 500) {
      percent = 6.5;
    } else if (amountValue === 1000) {
      percent = 7;
    } else if (amountValue === 1500) {
      percent = 7.5;
    } else if (amountValue === 2000) {
      percent = 8;
    } else {
      percent = 0;
    }

    setdaily(amountValue / 100 * percent);
    setmonth(amountValue / 100 * percent * 30);
    settotal((amountValue / 100 * percent * 30) + (amountValue));

  };
  const dashboardMessage = useSelector(
    (state) => state.dashboardmessage.message
  );

  return (
    <>
      <div className="container max-w-[1080px] mx-auto p-5 relative">
        <div className="flex justify-center my-2 ">
          <img className="w-[100px]" src={Logo} alt="" />
        </div>
      
        <div className="flex items-center gap-3 my-5">
          <img className="w-14 rounded" src={smallLogo} alt="" />
          <h1>
            Welcome back,{" "}
            {Object.entries(dashboardMessage).length > 0
              ? dashboardMessage.user[0].username
              : "user"}
          </h1>
        </div>
        <div className="card mx-auto bg-base-200 shadow-xl w-full">
          <div className="card-body">
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Total Asset</h1>
              <h1 className="text-sm md:text-xl">
                {format(dashboardMessage.asset)}
              </h1>
            </div>

            <div className="flex justify-between  items-center">
              <div className="flex ">
                <h1 className="text-sm md:text-xl">Locked asset</h1>


              </div>
              <div className="flex">
                <button
                  className=" text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-1 pb-0.5 rounded-lg outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150"


                  onClick={showLockFundModal}>
                  <small>  Add </small>
                </button>
                <h1 className="text-sm md:text-xl">
                  {format(dashboardMessage.locked_asset)}
                </h1>
              </div>

            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Today's profits</h1>
              <h1 className="text-sm md:text-xl">
                {format(dashboardMessage.today_profit)}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Promotion bonus</h1>
              <h1 className="text-sm md:text-xl">
                {format(dashboardMessage.promotion_bonus)}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className="text-sm md:text-xl">Accumulated profits</h1>
              <h1 className="text-sm md:text-xl">
                {format(dashboardMessage.total)}
              </h1>
            </div>
          </div>
        </div>
        <div>
          {lockFundModal ? (
            <>
              <div className="rounded-lg justify-center items-center flex overflow-x-hidden overflow-y-auto  fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative  my-6 mx-auto rounded-lg">
                  {/*content*/}

                  <div className="rounded-lg  reseller-popup w-72  border-0  shadow-xl relative flex flex-col  bg-base-200 outline-none focus:outline-none border-green-500">
                    <div
                      className="flex justify-end bg-base-200 p-5 shadow-lg rounded-lg "
                      onClick={() => {
                        closeFundModal();
                      }}
                    >
                      <svg className="font-bold"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#0A459F"
                        fill="#000a17"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </div>

                    <div className="flex flex-col justify-center p-5   rounded-lg bg-base-200 bg-white-300 text-black  ">
                      <p className="font-bold text-center text-2xl text-wrap text-green-600">
                        Add Fund
                      </p>
                      <p className="text-xs md:text-sm text-center my-3">
                        Your fund will be locked for 30 days.
                      </p>
                      <p className="text-xs md:text-sm text-center">
                        Contract room locks your money in our site for 30 days
                        allowing you to withdraw just your daily profits and the
                        commission is bigger. The locked amount will be returned
                        after 30 days
                      </p>
                      <select
                        type="text"
                        placeholder="Amount"
                        onChange={updateFundLock}
                        className="select select-secondary w-full my-3"
                      >
                        <option value="0" defaultValue>
                          Select Plan
                        </option>
                        <option value="300" >
                          300$ return 5.5%
                        </option>
                        <option value="500">500$ return 6.5%</option>
                        <option value="1000">1000$ return 7%</option>
                        <option value="1500">1500$ return 7.5%</option>
                        <option value="2000">2000$ return 8%</option>
                      </select>
                      {/* <input
                        type="text"
                        placeholder="Amount"
                        onChange={updateFundLock}
                        className="p-5 my-3"
                      /> */}

                      <button
                        className="btn-primary my-2 py-2 rounded-lg"
                        onClick={() => {
                          addLockFund();
                        }}
                      >
                        Add
                      </button>
                      <div>
                        <h1 className="text-sm md:text-md mb-2">
                          Daily profit: {daily}
                        </h1>
                        <h1 className="text-sm md:text-md mb-2">
                          30 days profit:  {month}
                        </h1>
                        <h1 className="text-sm md:text-md mb-2">
                          Return total after 30 days:  {total}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
        <div>
          {lockFundSuccess ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative  my-6 mx-auto ">
                  {/*content*/}

                  <div className=" reseller-popup w-72 border-0 shadow-lg relative flex flex-col  bg-base-200 outline-none focus:outline-none border-green-500">
                    <div
                      className="flex justify-end bg-base-200 p-5"
                      onClick={() => {
                        closeFundSuccessModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#0A459F"
                        fill="#000a17"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </div>

                    <div className="flex flex-col justify-center gap-5 p-5   rounded-t bg-base-200 bg-white-300 text-black h-80">
                      <p className="font-bold text-center text-2xl text-wrap text-green-600">
                        Fund added successfully
                      </p>
                      <div className="flex justify-center ">
                        <button
                          className="btn-primary mt-2 py-2 px-5 rounded-lg"
                          onClick={() => {
                            closeFundSuccessModal();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
        <div>
          {lockFundError ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                <div className="relative  my-6 mx-auto ">
                  {/*content*/}

                  <div className=" reseller-popup w-72 border-0 rounded-lg shadow-lg relative flex flex-col  bg-base-200 outline-none focus:outline-none border-green-500">
                    <div
                      className="flex justify-end bg-base-200 p-5"
                      onClick={() => {
                        closeFundErrorModal();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#0A459F"
                        fill="#000a17"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                      </svg>
                    </div>

                    <div className="flex flex-col justify-center gap-5 p-5   rounded-t bg-base-200 bg-white-300 text-black h-80">
                      <p className="font-bold text-center text-2xl text-wrap text-error">
                        {responseMessage}
                      </p>
                      <div className="flex justify-center ">
                        <button
                          className="btn-primary mt-2 py-2 px-5 rounded-lg"
                          onClick={() => {
                            closeFundErrorModal();
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-5 my-10">
          <Link to="/deposit"  onClick={window.scrollTo(0, 0)}   className="flex flex-col items-center">
            <img src={deposit} alt="" />
            <h1 className="text-xs md:text-xl">Deposit</h1>
          </Link>
          <Link to="/withdraw"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img src={withdraw} alt="" />
            <h1 className="text-xs md:text-xl">Withdraw</h1>
          </Link>
          <Link to="/invite-friends"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img src={inviteFriends} alt="" />
            <h1 className="text-xs md:text-xl">Invite friends</h1>
          </Link>
          <Link to="/team-report/agent"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img src={teamReport} alt="" />
            <h1 className="text-xs md:text-xl">Team report</h1>
          </Link>
          <Link to="/about"  onClick={window.scrollTo(0, 0)}   className="flex flex-col items-center">
            <img src={aboutUs} alt="" />
            <h1 className="text-xs md:text-xl">About us</h1>
          </Link>
          <Link to="/rule-description"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img src={rules} alt="" />
            <h1 className="text-xs md:text-xl">Rules description</h1>
          </Link>
          <Link to="/promo"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img src={promotion} alt="" />
            <h1 className="text-xs md:text-xl text-center">Promotion description</h1>
          </Link>
          <Link to="/summary"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img src={vip} alt="" />
            <h1 className="text-xs md:text-xl">RANK</h1>
          </Link>
          <Link to="/lucky-spin"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img className="w-11 rounded " src={wheelSpin} alt="" />
            <h1 className="text-xs md:text-xl">Lucky Spin</h1>
          </Link>
          <Link to="/lock-history"  onClick={window.scrollTo(0, 0)}  className="flex flex-col items-center">
            <img className="w-11 rounded " src={account} alt="" />
            <h1 className="text-xs md:text-xl">Contract history</h1>
          </Link>
        </div>
        <div>
          <div className="my-8">
            <h1 className="text-center text-xl">Task Lobby</h1>
            <h4 className="text-center text-xm text-green-500">
              {/* navigate ordergrab */}
              {/*  */}
              <button
                onClick={gotoGrabTask}
           
                className="btn px-8 my-3 py-3 font-bold bg-black text-white rounded focus:outline-none disabled:opacity-75"
              >
                Start Grabbing
              </button>
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-20">
            {dashboardDataPack.map((task) => (
              <div
                key={task.id}
                className="card mx-auto bg-base-200 shadow-xl w-full p-5 relative"
              >
                <div>
                  <img src={task.image} className="rounded-lg" alt="" />
                  <h1 className="text-sm md:text-md my-2">{task.marketName}</h1>
                  <p className="text-sm md:text-md">
                    Percent: {task.commission_percent / 10}%
                  </p>
                  <p className="text-sm md:text-md">
                    Order Amount: {task.grab_order}
                  </p>

                  <div className="flex justify-between">
                    <div>
                      {task.id < dashboardData.user[0].packid ? (
                        <button
                          type="button"
                          className="btn-sm md:btn lg:btn mt-5  font-bold bg-emerald-600 text-black  focus:outline-none disabled:opacity-75"
                          disabled
                        >
                          Completed
                        </button>
                      ) : (
                        // <button disabled className={`btn btn-blue-600 disabled:opacity-75 `}>
                        //   <span></span>
                        // </button>
                        <></>
                      )}
                      {task.id > dashboardData.user[0].packid ? (
                        <button
                          className={`btn-sm md:btn mt-5 lg:btn bg-primary text-white`}
                        >
                          <span>Upgrade</span>
                        </button>
                      ) : (
                        <></>
                      )}
                      {task.id == dashboardData.user[0].packid ? (
                        <button className={`btn-sm md:btn mt-5 lg:btn   bg-success`}>
                          <span>Current Level</span>
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>

                    <button className="btn-sm md:btn mt-5 lg:btn bg-secondary">
                      {task.packName}
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default Home;
