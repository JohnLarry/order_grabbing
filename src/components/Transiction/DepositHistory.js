import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { authkey } from "../Login/authkey";
import Transiction from "./Transiction";

const DepositeHistory = () => {
  const [dataLimit, setDataLimit] = useState();
  const [dipoHistory, setDipoHistory] = useState([]);
  const navigate = useNavigate();
  let count = 1;

  useEffect(() => {
    var history = new FormData();
    history.append("history", "");
    history.append("deposit_history", "");
    history.append("limit", 500);
    history.append("auth", authkey);
    history.append("logged", localStorage.getItem("auth"));
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: history,
    })
      .then((res) => res.json())
      .then((depoHistoryData) => {
        if (depoHistoryData.status == 200) {
          setDipoHistory(depoHistoryData?.message);
        } else {
          navigate("/login");
        }
      });
  }, []);

  let a1 = dipoHistory?.slice(0, 50);
  let a2 = dipoHistory?.slice(0, 100);
  let a3 = dipoHistory?.slice(0, 200);
  let a4 = dipoHistory?.slice(0, 300);
  let a5 = dipoHistory?.slice(0, 400);
  let a6 = dipoHistory?.slice(0, 500);

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
  } else if (dataLimit == 100) {
    d = a6;
  }


  return (
    <div >
   
    <Transiction></Transiction>
    <div className="container my-5 mx-auto max-w-[1080]">
        <div className="flex justify-between  mx-3">
        <select
          id="dataLimit"
          onChange={(e) => setDataLimit(e.target.value)}
          className="mx-auto select select-info select-bordered w-full "
        >
          <option vlaue={100}>All</option>
          <option value={1} defaultValue selected>
            50
          </option>
          <option value={2}>100</option>
          <option value={3}>200</option>
          <option value={4}>300</option>
          <option value={5}>400</option>
          <option value={6}>500</option>
        </select>
      </div>

    
      <section className="container my-7 mx-auto text-center">
          <div className="overflow-x-auto w-11/12 rounded shadow-lg mx-auto  ">
            <table className=" table table-compact w-11/12 text-center font-bold mb-16">
            <thead>
              <tr>
                <th></th>
                <th>Address</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            {d?.map((p) => (
              <tbody key={p?.id}>
                <tr>
                  <th>{count++}</th>
                  <td>{p?.pay_address}</td>

                  <td>{p?.price_amount}</td>

                  <td>
                    <div className="text-center ">
                      {p?.payment_status == "finished" ? (
                        <div className="flex font-bold ">
                          <span className="ml-2 rounded-lg badge badge-success gap-2">
                            Proceed
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}

                      {p?.payment_status == "waiting" ? (
                        <div className="flex font-bold ">
                          <span className="ml-2 rounded-lg badge badge-warning gap-2">
                            Waiting Payment
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      {p?.payment_status == "confirmed" ? (
                        <div className="flex font-bold ">
                          <span className="ml-2 rounded-lg badge badge-primary gap-2">
                            Being Proceed
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      {p?.payment_status == "sending" ? (
                        <div className="flex font-bold ">
                          <span className="ml-2 rounded-lg badge badge-primary gap-2">
                            Being Proceed
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                      {p?.payment_status == "confirming" ? (
                        <div className="flex font-bold ">
                          <span className="ml-2 rounded-lg badge badge-primary gap-2">
                            Being Proceed
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}

                      {p?.payment_status == "failed" ? (
                        <div className="flex font-bold ">
                          <span className="ml-2 rounded-lg badge badge-danger gap-2">
                            Failed
                          </span>
                        </div>
                      ) : (
                        <></>
                      )}
                   
                   
                   
                    </div>
                  </td>
                  <td>{p?.date}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </section>
      </div>
    </div>
  );
};

export default DepositeHistory;
