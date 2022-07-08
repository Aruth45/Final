import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import Profile from "./components/Profile/Profile";
import Services from "./pages/Services/Services";
import TransferMoney from "./pages/TransferMoney/TransferMomney";
import AddMoney from "./pages/AddMoney/AddMoney";
import AccountHistory from "./pages/AccountHistory/AccountHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="services" element={<Services />} />
        <Route path="transfers" element={<TransferMoney />} />
        <Route path="history" element={<AccountHistory />} />
        <Route path="addmoney" element={<AddMoney />} />
        <Route path="create_account" element={<CreateAccount />} />
        <Route path="login" element={<Login />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
