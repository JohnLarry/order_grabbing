import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authkey } from "../Login/authkey";
import { apiUrl } from "../Login/baseurl";
const Message = () => {
  const [messageLimit, setMessageLimit] = useState();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    var allHistory = new FormData();
    allHistory.append("auth", authkey);
    allHistory.append("logged", localStorage.getItem("auth"));
    allHistory.append("history", "");
    allHistory.append("limit", 500);

    fetch(apiUrl, {
      method: "POST",
      body: allHistory,
    })
      .then((res) => res.json())
      .then((data) => {


        if (data.status == 200) {

          setMessage(data?.message);
        } else {

        }
      });
  }, []);

  let a1 = message?.slice(0, 50);
  let a2 = message?.slice(0, 100);
  let a3 = message?.slice(0, 200);
  let a4 = message?.slice(0, 300);
  let a5 = message?.slice(0, 400);
  let a6 = message?.slice(0, 500);
  let a7 = message;

  let d = a1;


  if (messageLimit == 1) {
    d = a1;
  } else if (messageLimit == 2) {
    d = a2;
  } else if (messageLimit == 3) {
    d = a3;
  } else if (messageLimit == 4) {
    d = a4;
  } else if (messageLimit == 5) {
    d = a5;
  } else if (messageLimit == 6) {
    d = a6;
  } else if (messageLimit == 7) {
    d = a7;
  }

  return (
    <div className="container max-w-[1080px] mx-auto my-5">

      <div className="bg-base-200 px-4 py-2 rounded-xl my-5 mx-3 flex items-center justify-between">
        <Link to="/profile" className="btn btn-base-200 rounded-full px-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg> Back
        </Link>
        <h1 className="text-xl font-bold text-center">Inbox</h1>
      </div>

      <div className="flex justify-between  mx-3">
 
        <select
          id="messageLimit"
          onChange={(e) => setMessageLimit(e.target.value)}
          className="mx-auto select select-info select-bordered w-full "
        >
          <option vlaue={7}>All</option>
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

      <section className="mx-3 my-5 ">
        <div className="grid grid-cols-1 gap-5">
          {d?.map((m) => (
            <div
              key={m?.id}
              className="card mx-auto bg-base-200 shadow-xl w-full p-5"
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                  <div className="">


                    <h1>{m?.type}</h1>
                    <div className="max-w-[600px]" id="dataSh"></div>
                    <small
                      className="flex pb-1  pt-1"
                      dangerouslySetInnerHTML={{ __html: atob(m?.message) }}
                    />

                    <small>{m?.date}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Message;
