import React from "react";
import { Link } from "react-router-dom";
import Navber from "../Navber/Navber";
import "./OrderHistory.css";


const OrderHistory = () => {
  return (
    <div className="container max-w-[1080px] mx-auto ">
         <div className="bg-base-200 px-4 py-2 rounded-xl my-5 mx-3 flex items-center justify-between">
        <Link to="/profile" className="btn btn-base-200 rounded-full px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg> Back
        </Link>
        <h1 className="text-xl font-bold text-center">Grab History</h1>
      </div>
  
      <div className="  my-2 ">
        <div className="container mx-auto max-w-[1080]">
         

          <section className=" mx-3">
            <div className="flex justify-between max-w-[600px] md:mx-auto">
              <div className="flex flex-col items-center">
                <Link to="/grab-history"><button className="px-2 btn btn-blue-400 boder-0 rounded-lg shadow">Grab Orders</button></Link>
               
              </div>
              <div className="flex flex-col items-center">
                <Link to="/earn-history"><button className="px-2 btn btn-blue-400 boder-0 rounded-lg shadow">Profits History</button></Link>
              
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="OrderHistoryFooter">
        <Navber></Navber>
      </div>
    </div>
  );
};

export default OrderHistory;
