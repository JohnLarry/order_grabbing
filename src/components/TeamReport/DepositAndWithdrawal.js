import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { authkey } from "../Login/authkey";
import { updateTeamDeposit } from "../../store/slice";
import { updateTeamWithdraw } from "../../store/slice";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const DepositAndWithdrawal = () => {
  const [showCalender, setShowCalender] = useState(false);
  const dispatch = useDispatch();
  var teamDeposit = new FormData();
  teamDeposit.append("team", "");
  teamDeposit.append("auth", authkey);
  teamDeposit.append("logged", localStorage.getItem("auth"));
  const [transactionFilter, setTransactionFilter] = useState("all");
  const todaysdate = new Date();
  var yesterday = new Date();
  var pastweek = new Date();
  yesterday.setDate(todaysdate.getDate() - 1);
  pastweek.setDate(todaysdate.getDate() - 6);
  const formatYmd = (date) => date.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dateFilterChange = (e) => {
    const { value } = e.target;
    if (value === "today") {
      setShowCalender(false);
      setStartDate(formatYmd(todaysdate));
      setEndDate(formatYmd(todaysdate));
    }
    if (value === "yesterday") {
      setShowCalender(false);
      setStartDate(formatYmd(yesterday));
      setEndDate(formatYmd(yesterday));
    }
    if (value === "pastweek") {
      setShowCalender(false);
      setStartDate(formatYmd(pastweek));
      setEndDate(formatYmd(todaysdate));
    }
    if (value === "custom") {
      setStartDate(null);
      setEndDate(null);
      setShowCalender(true);
    }
  };
  if (startDate === "") {
    teamDeposit.append("startDate", "2022-04-04");
    teamDeposit.append("endDate", "2022-06-06");
  } else {
    teamDeposit.append("startDate", startDate);
    teamDeposit.append("endDate", endDate);
  }

  if (showCalender && startDate != null && endDate != null) {
    teamDeposit.append("startDate", formatYmd(startDate));
    teamDeposit.append("endDate", formatYmd(endDate));
  }

  useEffect(() => {
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: teamDeposit,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          if (data.message.deposit != null) {
            dispatch(updateTeamDeposit(data.message.deposit));
            dispatch(updateTeamWithdraw(data.message.withdraw));
          } else {
            dispatch(updateTeamDeposit([]));
            dispatch(updateTeamWithdraw([]));
          }
        }
      });
  }, [endDate]);

  const teamDepositData = useSelector((state) => state.deposit.deposit);
  const teamWithdrawData = useSelector((state) => state.withdraw.withdraw);
  const onChange = (dates) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
  };
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
      <div className="flex justify-between my-10">
        <select
          className="select select-secondary select-bordered w-[150px] max-w-xs"
          onChange={dateFilterChange}
        >
          <option value="today" defaultValue selected>
            Today
          </option>
          <option value="yesterday">Yesterday</option>
          <option value="pastweek">Within a week</option>
          <option value="custom">Start from 2022/07/12</option>
        </select>

        <select
          className="select select-secondary select-bordered w-[150px] max-w-xs"
          onChange={(e) => setTransactionFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="deposit">Deposit history</option>
          <option value="withdraw">Withdrawal history</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {showCalender && (
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          )}
        </table>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Account</th>

                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {(transactionFilter == "all") | (transactionFilter == "deposit")
                ? teamDepositData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.pay_address}</td>

                      <td>{item.price_amount}</td>
                      <td>
                        <span
                          className={
                            item.payment_status == "waiting"
                              ? "bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
                              : (item.payment_status == "confirmed") |
                                "sending" |
                                "confirming"
                              ? "bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                              : item.payment_status == "finished"
                              ? "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                              : item.payment_status == "failed"
                              ? "bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                              : "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                          }
                        >
                          {item.payment_status}
                        </span>
                      </td>
                      <td>{item.updated_at}</td>
                    </tr>
                  ))
                : null}
              {(transactionFilter == "all") | (transactionFilter == "withdraw")
                ? teamWithdrawData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.number}</td>

                      <td>{item.amount}</td>
                      <td>
                        <span
                          className={
                            item.status == "pending"
                              ? "bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900"
                              : item.status == "process"
                              ? "bg-green-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900"
                              : item.status == "paid"
                              ? "bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
                              : item.status == "cancled"
                              ? "bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900"
                              : "bg-gray-100 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300"
                          }
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{item.date}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>

          {teamWithdrawData.length === 0 ? (
            <div className="flex justify-center items-center">
              <div>
                <span>No data is availabe</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default DepositAndWithdrawal;
