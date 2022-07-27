import "./App.css";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import InviteFriends from "./components/InviteFriends/InviteFriends";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Withdraw from "./components/Withdraw/Withdraw";
import CurrentLevel from "./components/Vip/CurrentLevel";
import Summary from "./components/Vip/Summary";
import OrderGrab from "./components/OrderGrab/OrderGrab";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import NotFound from "./components/NotFound/NotFound";
import TeamReport from "./components/TeamReport/TeamReport";
import DepositAndWithdrawal from "./components/TeamReport/DepositAndWithdrawal";
import Deposit from "./components/Deposit/Deposit";
import ChangePassword from "./components/PersonalInfo/ChangePassword";
import Message from "./components/Message/Message";
import DepositeHistory from "./components/Transiction/DepositHistory";
import WithdrawalHistory from "./components/Transiction/WithdrawalHistory";
import GrabHistory from "./components/OrderHistory/GrabHistory/GrabHistory";
import EarnHistory from "./components/OrderHistory/EarnHistory/EarnHistory";
import LockHistory from "./components/LockHistory/lockHistory";
import Transiction from "./components/Transiction/Transiction";
import Wheel4 from "./components/Wheel4/Wheel4";
import ProtectedRoute from "./protectedRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Home/Profile"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>

          <Route path="/" element={<Profile></Profile>} />
        </Route>
        <Route path="" element={<ProtectedRoute />}>

<Route path="" element={<Profile></Profile>} />
</Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>


        <Route
          path="/register/:invitecode"
          element={<Register></Register>}
        ></Route>

        <Route path="/deposit" element={<ProtectedRoute />}>
          <Route path="/deposit" element={<Deposit></Deposit>}></Route>
        </Route>

        <Route path="/invite-friends" element={<ProtectedRoute />}>
          <Route
            path="/invite-friends"
            element={<InviteFriends></InviteFriends>}
          ></Route>
        </Route>

        <Route path="/personal-info" element={<ProtectedRoute />}>
          <Route
            path="/personal-info"
            element={<PersonalInfo></PersonalInfo>}
          ></Route>
        </Route>

        <Route path="/withdraw" element={<ProtectedRoute />}>
          <Route path="/withdraw" element={<Withdraw></Withdraw>}></Route>
        </Route>

        <Route path="/vip/current-level" element={<ProtectedRoute />}>
          <Route
            path="/vip/current-level"
            element={<CurrentLevel></CurrentLevel>}
          ></Route>

        </Route>

        <Route path="/summary" element={<ProtectedRoute />}>
          <Route path="/summary" element={<Summary></Summary>}></Route>
        </Route>

        <Route path="/profile" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile></Profile>}></Route>
        </Route>

        <Route path="/order-grab" element={<ProtectedRoute />}>
          <Route path="/order-grab" element={<OrderGrab></OrderGrab>}></Route>
        </Route>

        <Route path="/order-history" element={<ProtectedRoute />}>
          <Route
            path="/order-history"
            element={<OrderHistory></OrderHistory>}
          ></Route>
        </Route>
        <Route path="/team-report/agent" element={<ProtectedRoute />}>
          <Route
            path="/team-report/agent"
            element={<TeamReport></TeamReport>}
          />
        </Route>


        <Route path="/deposit-withdraw" element={<ProtectedRoute />}>
          <Route
            path="/deposit-withdraw"
            element={<DepositAndWithdrawal></DepositAndWithdrawal>}
          ></Route>
        </Route>

        <Route path="/change-password" element={<ProtectedRoute />}>
          <Route
            path="/change-password"
            element={<ChangePassword></ChangePassword>}
          ></Route>
        </Route>

        <Route path="/message" element={<ProtectedRoute />}>
          <Route path="/message" element={<Message></Message>}></Route>
        </Route>

        <Route path="/deposit-history" element={<ProtectedRoute />}>
          <Route
            path="/deposit-history"
            element={<DepositeHistory></DepositeHistory>}
          ></Route>
        </Route>

        <Route path="/withdrawal-history" element={<ProtectedRoute />}>
          <Route
            path="/withdrawal-history"
            element={<WithdrawalHistory></WithdrawalHistory>}
          ></Route>
        </Route>
        <Route path="/lock-history" element={<ProtectedRoute />}>
          <Route
            path="/lock-history"
            element={<LockHistory></LockHistory>}
          ></Route>
        </Route>
        <Route path="/personal-info" element={<ProtectedRoute />}>
          <Route
            path="/personal-info"
            element={<PersonalInfo></PersonalInfo>}
          ></Route>
        </Route>
        <Route path="/grab-history" element={<ProtectedRoute />}>
          <Route
            path="/grab-history"
            element={<GrabHistory></GrabHistory>}
          ></Route>
        </Route>
        <Route path="/transaction" element={<ProtectedRoute />}>
          <Route
            path="/transaction"
            element={<Transiction></Transiction>}
          ></Route>
        </Route>
        <Route path="/deposit-history" element={<ProtectedRoute />}>
          <Route
            path="/deposit-history"
            element={<DepositeHistory></DepositeHistory>}
          ></Route>
        </Route>
        <Route path="/earn-history" element={<ProtectedRoute />}>
          <Route
            path="/earn-history"
            element={<EarnHistory></EarnHistory>}
          ></Route>
        </Route>
        <Route path="/lucky-spin" element={<ProtectedRoute />}>
          <Route
            path="/lucky-spin"
            element={<Wheel4></Wheel4>}
          ></Route>
        </Route>

        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
