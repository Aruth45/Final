import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();

  const populateUser = async () => {
    const response = await fetch("http://localhost:4000/users/getuser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);

      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateUser();
      }
    } else {
      navigate("/login");
    }
  });
}

export default DashBoard;
