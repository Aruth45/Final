import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashBoardNav from "../../components/DasboardNav/DashboardNav";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [menu, setMenu] = useState(false);
  const block = "profile";

  const populateUser = async () => {
    const response = await fetch("http://localhost:4000/users/getuser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      populateUser();
    } else {
      navigate("/login");
    }
  }, []);
}
