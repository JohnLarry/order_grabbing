import "./App.css";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import InviteFriends from "./components/InviteFriends/InviteFriends";
import PersonalInfo from "./components/PersonalInfo/PersonalInfo";
import Withdraw from "./components/Withdraw/Withdraw";
import CurrentLevel from "./components/Vip/CurrentLevel";
import Summary from "./components/Vip/Summary";
// import Profile from "./components/Profile/Profile";

import Dashboard from "./components/Dashboard/Dashboard/Dashboard";
import About from "./components/About/About";
import OrderGrab from "./components/OrderGrab/OrderGrab";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import Promo from "./components/Promo/Promo";
import RuleDescription from "./components/RuleDescription/RuleDescription";
// import Home from "./components/Home/Home";
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
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/register/:invitecode"
          element={<Register></Register>}
        ></Route>
        <Route path="/deposit" element={<Deposit></Deposit>}></Route>
        <Route
          path="/invite-friends"
          element={<InviteFriends></InviteFriends>}
        ></Route>
        <Route
          path="/personal-info"
          element={<PersonalInfo></PersonalInfo>}
        ></Route>
        <Route path="/withdraw" element={<Withdraw></Withdraw>}></Route>
       
        <Route
          path="/vip/current-level"
          element={<CurrentLevel></CurrentLevel>}
        ></Route>
        <Route path="/summary" element={<Summary></Summary>}></Route>
        
        <Route path="/profile" element={<Profile></Profile>}></Route>

        <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/order-grab" element={<OrderGrab></OrderGrab>}></Route>
        <Route
          path="/order-history"
          element={<OrderHistory></OrderHistory>}
        ></Route>
        <Route path="/promo" element={<Promo></Promo>}></Route>
        <Route
          path="/rule-description"
          element={<RuleDescription></RuleDescription>}
        ></Route>
        <Route path="/team-report/agent" element={<ProtectedRoute />}>
          <Route
            path="/team-report/agent"
            element={<TeamReport></TeamReport>}
          />
        </Route>

        <Route
          path="/deposit-withdraw"
          element={<DepositAndWithdrawal></DepositAndWithdrawal>}
        ></Route>
        <Route
          path="/change-password"
          element={<ChangePassword></ChangePassword>}
        ></Route>
        <Route path="/message" element={<Message></Message>}></Route>
        <Route
          path="/deposit-history"
          element={<DepositeHistory></DepositeHistory>}
        ></Route>
        <Route
          path="/withdrawal-history"
          element={<WithdrawalHistory></WithdrawalHistory>}
        ></Route>
        <Route
          path="/lock-history"
          element={<LockHistory></LockHistory>}
        ></Route>
        <Route
          path="/personal-info"
          element={<PersonalInfo></PersonalInfo>}
        ></Route>
        <Route
          path="/grab-history"
          element={<GrabHistory></GrabHistory>}
        ></Route>
        <Route
          path="/transaction"
          element={<Transiction></Transiction>}
        ></Route>
        <Route
          path="/deposit-history"
          element={<DepositeHistory></DepositeHistory>}
        ></Route>
        <Route
          path="/earn-history"
          element={<EarnHistory></EarnHistory>}
        ></Route>
        <Route
          path="/lucky-spin"
          element={<Wheel4></Wheel4>}
        ></Route>
        <Route path="/*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
