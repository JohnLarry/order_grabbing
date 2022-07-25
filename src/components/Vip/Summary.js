import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaCheckCircle } from "react-icons/fa";
import { AiFillQuestionCircle } from "react-icons/ai";
import usdt from "../../images/usdt.png";
import { useSelector, useDispatch } from "react-redux";
import { authkey } from "../Login/authkey";
import { updateSummary } from "../../store/slice";
import { updateUser } from "../../store/slice";

const Summary = () => {
  const dispatch = useDispatch();
  var dashboard = new FormData();

  dashboard.append("dashboard", "");
  dashboard.append("auth", authkey);
  dashboard.append("logged", localStorage.getItem("auth"));
  useEffect(() => {
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: dashboard,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          dispatch(updateSummary(data.message.pack));
          dispatch(updateUser(data.message.user));
        }
      });
  }, []);
  const summary = useSelector((state) => state.summary.data);
  console.log(summary);
  const user = useSelector((state) => state.user.data);

  const format = (x) => {
    return Number.parseFloat(x).toFixed(3);
  };



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
        <h1 className="text-xl font-bold text-center">Memberships</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        {summary.map((card) =>
          card.id < user[0].packid ? (
            <div className="card bg-base-200 shadow-xl ">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h1 className="">{card.packName} </h1>

                  <div className=" bg-base-300 p-2 flex items-center gap-3">
                    <span className="flex"> Completed </span>
                    <FaCheckCircle className="text-green-400" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm flex items-center">
                    Commission rate:
                    <label
                      for="my-modal-3"
                      class="btn p-0 modal-button bg-transparent border-0 hover:bg-transparent"
                    >
                      <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>{" "}
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-3"
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box relative">
                        <label
                          for="my-modal-3"
                          class="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>

                        <p class="py-4 text-xs md:text-sm">
                          Commision rate is your total daily profits after you
                          finished all your grabs. The total percentage is
                          calculated from your Grab balance.
                        </p>
                      </div>
                    </div>
                  </h1>
                  <h1 className="text-xs md:text-sm ">
                    {card.commission_percent} %
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Minimum Required Grab Balance:{" "}
                  </h1>
                  <h1 className="text-xs md:text-sm ">{card.balanceRequire} <img className="inline ml-1 h-[20px] w-[20px]" src={usdt} alt="" /></h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Minimum Required Active Layer One Members:
                  </h1>
                  <h1 className="text-xs md:text-sm ">{card.activeRequire}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Available Grab Orders:
                    <label
                      for="my-modal-7"
                      class="btn p-0  modal-button bg-transparent border-0 hover:bg-transparent"
                    >
                      <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>{" "}
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-7"
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box relative">
                        <label
                          for="my-modal-7"
                          class="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>

                        <p class="py-4 text-xs md:text-sm">
                          The number of the total "Available Grab Orders"
                          decreases with each membership upgrade and increases
                          the "Commission per Grab Order" due to our policy
                          "Less work, more profits".
                        </p>
                      </div>
                    </div>
                  </h1>
                  <h1 className="text-xs md:text-sm ">{card.grab_order}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Commission per Grab Order:
                  </h1>
                  <h1 className="text-xs md:text-sm ">{format(card.commission_percent / card.grab_order)} %</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">Staking Feature:</h1>
                  <h1 className="text-xs md:text-sm ">{card.marketName}</h1>
                </div>
              </div>
            </div>
          ) : card.id == user[0].packid ? <div className="card bg-base-200 shadow-xl ">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <h1 className="">{card.packName} </h1>

                <div className=" bg-base-300 p-2 flex items-center gap-3">
                  <span className="flex"> Active </span>
                  <FaCheckCircle className="text-blue-400" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm flex items-center">
                  Commission rate:
                  <label
                    for="my-modal-3"
                    class="btn p-0 modal-button bg-transparent border-0 hover:bg-transparent"
                  >
                    <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>{" "}
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal-3"
                    class="modal-toggle"
                  />
                  <div class="modal">
                    <div class="modal-box relative">
                      <label
                        for="my-modal-3"
                        class="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>

                      <p class="py-4 text-xs md:text-sm">
                        Commision rate is your total daily profits after you
                        finished all your grabs. The total percentage is
                        calculated from your Grab balance.
                      </p>
                    </div>
                  </div>
                </h1>
                <h1 className="text-xs md:text-sm ">
                  {card.commission_percent} %
                </h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm ">
                  Minimum Required Grab Balance:{" "}
                </h1>
                <h1 className="text-xs md:text-sm ">{card.balanceRequire} <img className="inline ml-1 h-[20px] w-[20px]" src={usdt} alt="" /></h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm ">
                  Minimum Required Active Layer One Members:
                </h1>
                <h1 className="text-xs md:text-sm ">{card.activeRequire}</h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm ">
                  Available Grab Orders:
                  <label
                    for="my-modal-7"
                    class="btn p-0  modal-button bg-transparent border-0 hover:bg-transparent"
                  >
                    <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>{" "}
                  </label>
                  <input
                    type="checkbox"
                    id="my-modal-7"
                    class="modal-toggle"
                  />
                  <div class="modal">
                    <div class="modal-box relative">
                      <label
                        for="my-modal-7"
                        class="btn btn-sm btn-circle absolute right-2 top-2"
                      >
                        ✕
                      </label>

                      <p class="py-4 text-xs md:text-sm">
                        The number of the total "Available Grab Orders"
                        decreases with each membership upgrade and increases
                        the "Commission per Grab Order" due to our policy
                        "Less work, more profits".
                      </p>
                    </div>
                  </div>
                </h1>
                <h1 className="text-xs md:text-sm ">{card.grab_order}</h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm ">
                  Commission per Grab Order:
                </h1>
                <h1 className="text-xs md:text-sm ">{format(card.commission_percent / card.grab_order)} %</h1>
              </div>
              <div className="flex justify-between items-center">
                <h1 className="text-xs md:text-sm ">Staking Feature:</h1>
                <h1 className="text-xs md:text-sm ">{card.marketName}</h1>
              </div>
            </div>
          </div> : (
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <div className="flex justify-between">
                  <h1>{card.packName}</h1>
                  <div className="bg-base-300  p-2 flex items-center gap-3">
                    <span className="flex">Locked   </span>
                    <span className="text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>

                  </div>


                </div>

                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm flex items-center">
                    Commission rate:
                    <label
                      for="my-modal-3"
                      class="btn p-0 modal-button bg-transparent border-0 hover:bg-transparent"
                    >
                      <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>{" "}
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-3"
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box relative">
                        <label
                          for="my-modal-3"
                          class="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>

                        <p class="py-4 text-xs md:text-sm">
                          Commision rate is your total daily profits after you
                          finished all your grabs. The total percentage is
                          calculated from your Grab balance.
                        </p>
                      </div>
                    </div>
                  </h1>
                  <h1 className="text-xs md:text-sm ">
                    {card.commission_percent} %
                  </h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Minimum Required Grab Balance:{" "}
                  </h1>
                  <h1 className="text-xs md:text-sm ">{card.balanceRequire}  <img className="inline ml-1 h-[20px] w-[20px]" src={usdt} alt="" /></h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Minimum Required Active Layer One Members:
                  </h1>
                  <h1 className="text-xs md:text-sm ">{card.activeRequire}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Available Grab Orders:
                    <label
                      for="my-modal-7"
                      class="btn p-0  modal-button bg-transparent border-0 hover:bg-transparent"
                    >
                      <AiFillQuestionCircle className=" text-error"></AiFillQuestionCircle>{" "}
                    </label>
                    <input
                      type="checkbox"
                      id="my-modal-7"
                      class="modal-toggle"
                    />
                    <div class="modal">
                      <div class="modal-box relative">
                        <label
                          for="my-modal-7"
                          class="btn btn-sm btn-circle absolute right-2 top-2"
                        >
                          ✕
                        </label>

                        <p class="py-4 text-xs md:text-sm">
                          The number of the total "Available Grab Orders"
                          decreases with each membership upgrade and increases
                          the "Commission per Grab Order" due to our policy
                          "Less work, more profits".
                        </p>
                      </div>
                    </div>
                  </h1>
                  <h1 className="text-xs md:text-sm ">{card.grab_order}</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">
                    Commission per Grab Order:
                  </h1>
                  <h1 className="text-xs md:text-sm ">{format(card.commission_percent / card.grab_order)} %</h1>
                </div>
                <div className="flex justify-between items-center">
                  <h1 className="text-xs md:text-sm ">Staking Feature:</h1>
                  <h1 className="text-xs md:text-sm ">{card.marketName}</h1>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Summary;
