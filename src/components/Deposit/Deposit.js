import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Link, useNavigate } from "react-router-dom";
import { authkey } from "../Login/authkey";
import "./Deposit.css";
import usdt from "../../images/usdt.png";

const Deposit = () => {
  const [deposits, setDeposits] = useState();

  const navigate = useNavigate();
  const Completionist = () => <span>Your time ended!</span>;

  // Renderer callback with condition
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  var deposit = new FormData();
  deposit.append("auth", authkey);
  deposit.append("logged", localStorage.getItem("auth"));
  deposit.append("deposit", "");
  deposit.append("create", "");
  useEffect(() => {
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: deposit,
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.status == 200) {

          setDeposits(data);
        } else {
          navigate("/login");
        }
      });
  }, []);


  return (
    <div className="container max-w-[1080px] mx-auto pb-10 ">
      <div className="bg-base-200 px-4 py-2 rounded-xl my-5 mx-3 flex items-center justify-between">
        <Link to="/profile" className="btn btn-base-200 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg> Back
        </Link>
        <h1 className="text-xl font-bold text-center">Deposit</h1>
      </div>


      <div className="m-3">
        <div className="card w-100 bg-base-200 text-black shadow-xl">
          <div className="card-body">

            <h3 className="font-bold">
              <p>
                Minimum Amount: <span className="pl-1"> {deposits?.message?.min_amount}
                   <img className="inline ml-1 h-[20px] w-[20px]" src={usdt} alt="" />
                </span>
              </p>

            </h3>
            <h4 className="font-bold">
              <span>Network: </span>
              <span className="uppercase">{deposits?.message?.network}</span>
            </h4>
          
            <div className=" inline my-2">
            <h4 className=" px-1 py-1 font-bold text-base">Address</h4>
              <div className="form-control bg-white py-4 inline rounded ">

                <label className="input-group ">
                  
                  <input id="copy" type="text" style={{ width: deposits?.message?.address.length * 9 + "px" }} value={deposits?.message?.address} className="border-0  inputt outline-0 rounded input input-bordered bg-white " readOnly />
                  <span className=" bg-slate-900 text-white font-bold" onClick={() => {
                    navigator.clipboard.writeText(document.getElementById('copy').value); document.getElementById('htmlCah').innerHTML = `Copied`;
                    setTimeout(function () {
                      document.getElementById('htmlCah').innerHTML = `Copy`;
                    }, 5000);
                  }}>
                    <div className=" bg-slate-900 text-white font-bold" id='htmlCah'>Copy</div>
                  </span>
                </label>
              </div>

            </div>



            <div>
              <h2 className="font-bold text-base md:text-xl  lg:text-xl">
                <i className="fa-solid fa-clock"></i> Time left to pay :{" "}
                <span className="text-green-600">
                
                  <Countdown date={Date.now() + 3600000} renderer={renderer} />
                </span>{" "}
              </h2>
              <h4 className="my-3 text-gray-700">Make sure to always cover the Gas Fee or your
                deposit will not be completed.</h4>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

export default Deposit;
