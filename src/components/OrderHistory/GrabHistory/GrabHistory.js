import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authkey } from "../../Login/authkey";
import OrderHistory from "../OrderHistory";

const GrabHistory = () => {
  const [dataLimit, setDataLimit] = useState();
  const [ghistory, setghistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    var history = new FormData();
    history.append("grabHistory", "");
    history.append("auth", authkey);
    history.append("limit", 500);
    history.append("logged", localStorage.getItem("auth"));

    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: history,
    })
      .then((res) => res.json())
      .then((gHistoryData) => {
        if (gHistoryData.status == 200) {
          setghistory(gHistoryData.message);
        } else {
          navigate("/login");
        }
      });
  }, []);

  let a1 = ghistory?.slice(0, 50);
  let a2 = ghistory?.slice(0, 100);
  let a3 = ghistory?.slice(0, 200);
  let a4 = ghistory?.slice(0, 300);
  let a5 = ghistory?.slice(0, 400);
  let a6 = ghistory?.slice(0, 500);
  let d = a1;

  if (dataLimit == 1) {
    d = a1;
  } else if (dataLimit == 2) {
    d = a2;
  } else if (dataLimit == 3) {
    d = a3;
  } else if (dataLimit == 4) {
    d = a4;
  } else if (dataLimit == 5) {
    d = a5;
  } else if (dataLimit == 6) {
    d = a6;
  } else if (dataLimit == 7) {
    d = a6;
  }

  return (
    <div>
      <OrderHistory></OrderHistory>
      <div className="container mx-auto max-w-[1080] mb-24">
        <div className="flex justify-between  lg:mx-0 md:mx-0 mx-5">
          <select
            id="dataLimit"
            onChange={(e) => setDataLimit(e.target.value)}
            className="select select-secondary select-bordered w-[150px] max-w-xs"
          >

            <option value={1} defaultValue selected>
              50
            </option>
            <option value={2}>100</option>
            <option value={3}>200</option>
            <option value={4}>300</option>
            <option value={5}>400</option>
            <option value={6}>500</option>
            <option vlaue={7}>All</option>
          </select>
        </div>
        <section className="  container my-10  ">
          <div className="grid grid-cols-1 gap-5">


            {d?.map((p) => (
              <div
                key={p?.id}
                className="card mx-auto bg-base-200 shadow-xl w-full p-5 "
              >

                <div className="">
                  <div className="flex justify-between">
                    <small className=" text-gray-600">order number: {p?.number} </small>
                    {p?.status == "finished" ? (
                      <span className=" font-bold ml-2 rounded-lg badge badge-success gap-2">
                        Complete
                      </span>
                    ) : (
                      <></>
                    )}
                    {p?.status == "pending" ? (
                      <span className="font-bold  ml-2 rounded-lg badge badge-warning gap-2">
                        Pending
                      </span>
                    ) : (
                      <></>
                    )}
                   
                  </div>
                  <div className="flex w-full">
                    <div className="flex justify-center items-center">
                      <img src={p?.image} alt="Not loaded" className="m-3 w-[100px] h-[100px]" />
                    </div>

                    <div className="m-3 w-full">
                      <h1>{p?.title}</h1>
                      <small className="mt-8 text-gray-600">Order Time: {p?.time}</small>
                      <div className="flex justify-between">
                        <h4 className="font-bold mt-3 text-2xl text-red-700">{p?.price}</h4>
                        <h4 className="mt-3 text-xl text-green-700">{p?.commission}</h4>
                      </div>

                    </div>

                  </div>





                </div>

              </div>



            ))}

          </div>
        </section>
      </div >
    </div >
  );
};

export default GrabHistory;
