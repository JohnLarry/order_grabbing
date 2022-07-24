import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateDashboardMessage } from "../../store/slice";
import { authkey } from "../Login/authkey";
const InviteFriends = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  var dashboardProfile = new FormData();
  dashboardProfile.append("dashboard", "");
  dashboardProfile.append("auth", authkey);
  dashboardProfile.append("logged", localStorage.getItem("auth"));

  useEffect(() => {
    fetch("https://mining-nfts.com/api/", {
      method: "POST",
      body: dashboardProfile,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 200) {
          dispatch(updateDashboardMessage(data.message));
        } else {
          navigate("/login");
        }
      });
  }, []);

  var dashboardMessagex = useSelector(
    (state) => state.dashboardmessage.message
  );

  return (

    <div className="bg-slate-900 ">
      <div className="container max-w-[1080px] mx-auto py-5">
        

        <div className="bg-base-200 px-4 py-2 rounded-xl my-5 mx-3 flex items-center justify-between">
          <Link to="/" className="btn btn-base-200 rounded-full px-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg> Back
          </Link>
          <h1 className="text-xl font-bold text-center">Grow your Team</h1>
        </div>




        <div className="my-16 text-center">
          <h1 className="text-5xl font-extrabold text-white">Invite New Members</h1>
          <h1 className="text-3xl font-bold text-white mt-2">to join your team!</h1>
          <p className="my-5">
            <span className="text-xl text-white">
              Invitation Code:
              {Object.entries(dashboardMessagex).length === 0 ? (
                "user name"
              ) : (
                <span> {dashboardMessagex.user[0].invite}</span>
              )}
            </span>
          </p>
          <button
            className="btn btn-primary text-white font-bold rounded-xl"
            onClick={navigator.clipboard.writeText(
              Object.entries(dashboardMessagex).length === 0
                ? "user name"
                : "https://farfetchedgrab.com/register/" +
                dashboardMessagex.user[0].invite
            )}
          >
            Referral Link
          </button>
        </div>

        <div class="card lg:card-side bg-base-200 shadow-xl mt-8 mb-4">

          <div class="card-body">

            <p className="text-xl"> By inviting more members to your team, you will increase your
              daily profits.</p>
            <div class="card-actions text-slate-900">
              <p className="my-2 bg-base-300 p-3 rounded-lg shadow-md"><span className="font-bold">Layer One: </span><span>15% of daily profits from members who registered with your referral link.</span></p>
              <p className="my-2 bg-base-300 p-3 rounded-lg shadow-md"><span className="font-bold">Layer Two: </span><span>10% of daily profits from members who registered
                using the referral link of your Layer One members.</span></p>
              <p className="my-2 bg-base-300 p-3 rounded-lg shadow-md"><span className="font-bold">Layer Three: </span><span>5% of daily profits from members who registered
                using the referral link of your Layer Two members.</span></p>
              <p className="my-2 bg-base-300 p-3 rounded-lg shadow-md"><span className="font-bold">Layer Four: </span><span>2.5% of daily profits from members who registered
                using the referral link of your Layer Three members.</span></p>
              <p className="my-2 bg-base-300 p-3 rounded-lg shadow-md"><span className="font-bold">Layer Five: </span><span>1% of daily profits from members who registered
                using the referral link of your Layer Four members.</span></p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteFriends;
