import React from "react";
import { Link } from "react-router-dom";
import vipLogo from "../../images/278df00.svg";
import { IoIosArrowBack } from "react-icons/io";


const CurrentLevel = () => {
  return (
    <div className="container max-w-[1080px] mx-auto p-5">
      <div className="bg-base-200 p-5 rounded-xl mb-5 flex items-center justify-between">
        <Link to="/">
          <IoIosArrowBack></IoIosArrowBack>
        </Link>
        <h1 className="text-xl font-bold text-center">RANK</h1>
      </div>
      <div className="flex justify-between max-w-[600px] md:mx-auto">
        <div className="flex flex-col items-center">
          <Link to="/current-level">Current Level</Link>
          <div className="h-[2px] w-6 bg-primary"></div>
        </div>
        <div className="flex flex-col items-center">
          <Link to="/summary">Summary</Link>
          <div className="h-[2px] w-6 bg-primary"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h1 className="text-xl font-medium my-5">Current level - (RANK-1)</h1>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="w-24">
                <img src={vipLogo} alt="" />
              </div>
              <div className="flex justify-between">
                <h1>Commission rate</h1>
                <h1>0.04%</h1>
              </div>

              <div className="flex justify-between">
                <h1>Open markets</h1>
                <h1>Shein</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-medium my-5">To reach next RANK level</h1>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between">
                <h1>Valid junior members</h1>
                <h1>
                  <span className="text-primary">0</span>/1
                </h1>
              </div>
              <p className="text-xs mb-3">
                Deposit required <span className="text-primary">100</span> to be
                deemed as a valid junior member
              </p>
              <div className="flex justify-between">
                <h1>Deposit to upgrade</h1>
                <h1>
                  <span className="text-primary">0</span>/100
                </h1>
              </div>
              <div className="flex justify-between">
                <h1>Balance to upgrade</h1>
                <h1>
                  <span className="text-primary">0</span>/100
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-[600px] mx-auto mt-10">
        <button className="btn btn-secondary">Invite Friends</button>
        <button className="btn btn-primary">Deposit</button>
      </div>
    </div>
  );
};

export default CurrentLevel;
