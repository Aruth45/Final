import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateAccount from "./pages/CreateAccount/CreateAccount";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import Profile from "./components/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
     
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="create_account" element={<CreateAccount />} />
          <Route path="login" element={<Login />} />
        </Routes>
   
    </Router>
  );
}

export default App;
