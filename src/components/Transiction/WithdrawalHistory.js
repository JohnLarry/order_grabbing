import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { authkey } from "../Login/authkey";
import Transiction from "./Transiction";
import { apiUrl } from "../Login/baseurl";

const WithdrawalHistory = () => {
  const [dataLimit, setDataLimit] = useState();
  const [whitdrawHistory, setWhitdrawHistory] = useState([]);
  const navigate = useNavigate();
  let count = 1;

  useEffect(() => {
    var history = new FormData();
    history.append("history", "");
    history.append("withdraw_history", "");
    history.append("limit", 500);
    history.append("auth", authkey);
    history.append("logged", localStorage.getItem("auth"));
    fetch(apiUrl, {
      method: "POST",
      body: history,
    })
      .then((res) => res.json())
      .then((depoHistoryData) => {
        if (depoHistoryData.status == 200) {
          setWhitdrawHistory(depoHistoryData?.message);
        } else {
          navigate("/login");
        }
      });
  }, []);

  let a1 = whitdrawHistory?.slice(0, 50);
  let a2 = whitdrawHistory?.slice(0, 100);
  let a3 = whitdrawHistory?.slice(0, 200);
  let a4 = whitdrawHistory?.slice(0, 300);
  let a5 = whitdrawHistory?.slice(0, 400);
  let a6 = whitdrawHistory?.slice(0, 500);

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
    <div >
      <Transiction></Transiction>
    <div className="container my-5 mx-auto max-w-[1080]">
      
      <div className="flex justify-between  mx-3">
        <select
          id="dataLimit"
          onChange={(e) => setDataLimit(e.target.value)}
          className="mx-auto select select-info select-bordered w-full  "
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


      <section className="container my-7 mx-auto">
      <div className="overflow-x-auto rounded  mx-1 ">
            <table className=" table table-compact w-11/12 mx-auto  shadow-lg text-center font-bold mb-16">
            <thead>
              <tr>
                <th></th>
                <th>ACCOUNT</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            {d?.map((p) => (
              <tbody key={p?.id}>
                <tr>
                  <th>{count++}</th>
                  <td>{p?.number}</td>

                  <td>{p?.amount}</td>

                  <td>
                    <div className="text-center ">
                      {p?.status == "paid" ? (
                        <span className="ml-2 rounded-lg badge badge-success gap-2">
                          Paid
                        </span>
                      ) : (
                        <></>
                      )}
                      {p?.status == "pending" ? (
                        <span className="ml-2 rounded-lg badge badge-warning gap-2">
                          Pending
                        </span>
                      ) : (
                        <></>
                      )}

                      {p?.status == "process" ? (
                        <span className="ml-2 rounded-lg badge badge-primary gap-2">
                          Being Proceed
                        </span>
                      ) : (
                        <></>
                      )}
                      {p?.status == "cancelled" ? (
                        <span className="ml-2 rounded-lg badge badge-danger gap-2">
                          Cancelled
                        </span>
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

export default WithdrawalHistory;
