import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const block = "dashboard";

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

  return (
    <main>
      {userData && (
        <div className={`${block}__personal-info`}>
          <div className={`${block}__personal-details`}>
            <p className={`${block}__name`}>{userData.user.fullname}</p>
            <span className={`${block}__ocupation`}>
              {userData.user.ocupation}
            </span>
          </div>

          <img
            alt="Profile front face"
            src={userData.user.profilePic}
            className={`${block}__profilePic`}
          />
        </div>
      )}
    </main>
  );
}

export default DashBoard;
