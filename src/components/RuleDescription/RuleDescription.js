import React from "react";
import { Link } from "react-router-dom";
import "./RuleDescription.css";
import usdt from "../../images/usdt.png";

const RuleDescription = () => {
  return (
    <div className="container max-w-[1080px] mx-auto p-5">
      <div className="bg-base-200 px-4 py-2 rounded-xl   flex items-center justify-between">
        <Link to="/" className="btn btn-base-200 rounded-full">
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
        <h1 className="text-xl font-bold text-center">Rules</h1>
      </div>

      <div className="bg-base-100  content-area p-5 ">
        <div className="container mx-auto max-w-[1080px] ">
          <section>
            <div className="pl-5">
              <div>
                <h2 className="font-bold text-dark text-xl">About team</h2>
              </div>
              <div>
                <p className="pb-2">
                  1. You can only receive Daily Profit % from Grabs made by your
                  team members who are considered Active.
                </p>
                <p className="pb-2">
                  2. A team member is considered Active if he/her has at least
                  100{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />{" "}
                  Available Grab Balance.
                </p>
                <p>
                  3. Grab Commission % from your team members is allocated
                  automatically in your account.
                </p>
              </div>
            </div>

            <div className="pl-5">
              <div>
                <h2 className="font-bold text-dark text-xl">About deposit</h2>
              </div>
              <div>
                <p className="pb-2">
                  1. Minum deposit amount is: 30{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />{" "}
                </p>
                <p className="pb-2">
                  2. <span className="font-bold">Deposit Bonusus:</span> <br />
                  <span className="pl-10 break-all block">
                    - 3.88% for deposits you make which is allocated
                    automatically in your account
                  </span>
                  <br />
                  <span className="pl-10 break-all block">
                    {" "}
                    - 2.88% for deposits your Layer One Team Memembers make
                    which is allocated automatically in your account
                  </span>
                </p>
                <p>
                  3. Deposits take between 5 and 30 minutes to show up in your
                  account.
                </p>
              </div>
            </div>

            <div className="pl-5">
              <div>
                <h2 className="font-bold text-dark text-xl">
                  About withdrawal
                </h2>
              </div>
              <div>
                <p className="pb-2">
                  1. Minimum withdrawal amount is 50{" "}
                  <img
                    className="inline ml-1 h-[20px] w-[20px]"
                    src={usdt}
                    alt=""
                  />{" "}
                </p>
                <p>
                  2. Withdrawals are processed each day between 15:00 UTC and
                  19:00 UTC.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RuleDescription;
