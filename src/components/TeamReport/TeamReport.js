import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authkey } from "../Login/authkey";
import { updateTeamReports } from "../../store/slice";
import usdt from "../../images/usdt.png";
import { AiFillQuestionCircle } from "react-icons/ai";

const TeamReport = () => {
  const dispatch = useDispatch();
  var teamReport = new FormData();
  teamReport.append("startDate", "2022-04-04");
  teamReport.append("endDate", "2022-06-06");
  teamReport.append("team", "");
  teamReport.append("auth", authkey);
  teamReport.append("logged", localStorage.getItem("auth"));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: teamReport,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          dispatch(updateTeamReports(data.message.reports));
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, []);

  var teamReportData = useSelector((state) => state.reports.reports);



  return (
    <div className="container max-w-[1080px] mx-auto p-5">
      <div className="bg-base-200 px-4 py-2 rounded-xl   flex items-center justify-between">
        <Link to="/profile" className="btn btn-base-200 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>{" "}
          Back
        </Link>
        <h1 className="text-xl font-bold text-center">Team Reports</h1>
      </div>

      <section className=" m-5">
        <div className="flex justify-between gap-10 max-w-[600px] md:mx-auto">
          <div className="flex flex-col items-center">
            <Link to="/team-report/agent">
              <button className="btn btn-blue-400 text-xs md:text-sm boder-0 rounded-lg shadow">
                Team Report
              </button>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <Link to="/deposit-withdraw">
              <button className="btn btn-blue-400 text-xs md:text-sm boder-0 rounded-lg shadow">
                Team Deposit and withdrawal
              </button>
            </Link>
          </div>
        </div>
      </section>

      <div className="card mx-auto bg-base-200 shadow-xl w-full">
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <svg
                role="status"
                className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
            </div>
          ) : null}
          <div className="card mx-auto bg-base-200 shadow-xl w-full">
            <div className="card-body">
              <div className="flex gap-5 mb-5">
                <div>
                  <h2 className="card-title">Team Information</h2>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">Total Team Balance</h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.balance} USDT{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />
                </h1>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">Total Team Deposits</h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.deposit} USDT{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />
                </h1>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">Total Team Withdrawals</h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.withdraw} USDT{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />
                </h1>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">Total Team Profits</h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.profit} USDT{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />
                </h1>
              </div>
              <hr />
              <div>
                <h2 className="text-xs md:text-sm">All Layers:</h2>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer One (15% of Daily Profit):
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.profitLayers?.profitLayer1}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Two (10% of Daily Profit):
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.profitLayers?.profitLayer2}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Three (5% of Daily Profit):
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.profitLayers?.profitLayer3}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Four (2.5% of Daily Profit):
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.profitLayers?.profitLayer4}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Five (1% of Daily Profit):
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.profitLayers?.profitLayer5}
                </h1>
              </div>
            </div>
          </div>
          <div className="card mx-auto bg-base-200 shadow-xl w-full my-5">
            <div className="card-body">
              <div className="flex gap-5 mb-5">
                <div>
                  <h2 className="card-title">Team Member Details</h2>
                </div>
              </div>

              <div>
                <h2 className="text-xs md:text-sm">Number of team members:</h2>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer One (Total Members){" "}
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.memberLayers?.layer1}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Two (Total Members){" "}
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.memberLayers?.layer2}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Three (Total Members){" "}
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.memberLayers?.layer3}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Four (Total Members){" "}
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.memberLayers?.layer4}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">
                  Layer Five (Total Members){" "}
                </h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.memberLayers?.layer5}
                </h1>
              </div>
              <hr />
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm">Total Members</h1>
                <h1 className="text-xs md:text-sm">
                  {teamReportData?.totalRefer}
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-xs md:text-sm">
                    Number of active members{" "}
                  </h1>
                  
                  <label
                    htmlFor="my-modal-8"
                    className="btn p-0 modal-button bg-transparent border-0 hover:bg-transparent"
                  >
                    <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal-8"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative">
                      <label
                        htmlFor="my-modal-8"
                        className="btn btn-xs btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>

                      <p className="text-xs md:text-sm mt-10">
                      A active member is a user who has at least 100  <img className="inline ml-1 h-[20px] w-[20px]" src={usdt} alt="" /> in his Grab balance (Staked balance does not count).
                        
                      </p>
                    </div>
                  </div>
                </div>
                <h1 className="text-xs md:text-sm">{teamReportData.active}</h1>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <h1 className="text-xs md:text-sm">
                    Number of inactive members{" "}
                  </h1>
                  <label
                    htmlFor="my-modal-3"
                    className="btn p-0 modal-button bg-transparent border-0 hover:bg-transparent"
                  >
                    <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal-3"
                    className="modal-toggle"
                  />
                  <div className="modal">
                    <div className="modal-box relative">
                      <label
                        htmlFor="my-modal-3"
                        className="btn btn-xs btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>

                      <p className="text-xs md:text-sm mt-10">
                      An inactive member is a user who has under 100  <img className="inline ml-1 h-[20px] w-[20px]" src={usdt} alt="" /> in his Grab balance.
                      </p>
                    </div>
                  </div>
                </div>
                <h1 className="text-xs md:text-sm">
                  {teamReportData.inactive}
                </h1>
              </div>
              <hr />
              <p className="text-xs md:text-sm text-error">
                Important: If a member from Layer Three becomes inactive for
                example, then you will not get any percentage of the daily
                profit from the members of his downline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamReport;
