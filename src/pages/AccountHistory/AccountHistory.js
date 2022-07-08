import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardNav from "../../components/DasboardNav/DashboardNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWater,
  faBoltLightning,
  faPhone,
  faWifi,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

function AccountHistory() {
  const [userData, setUserData] = useState();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const block = "records";

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

  return (
    <div className={`${block}`}>
      <DashBoardNav menu={menu} setMenu={setMenu} />

      <div className={`${block}__container`}>
        <h2>Account activity</h2>
        <button
          onClick={() => setMenu(!menu)}
          type="button"
          className={`${block}__menu-btn`}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {userData &&
          userData.records.map((record, index) => (
            <div key={index} className={`${block}__item`}>
              <div className={`${block}__info-container`}>
                <di>
                  <p className={`${block}__action`}>{record.action}</p>
                  <p className={`${block}__amount`}> Amount: ₡{record.amount}</p>
                  <p className={`${block}__destination`}>{record.destination}</p>
                </di>
              </div>
            </div>  
          ))}
      </div>
    </div>
  );
}

export default AccountHistory;
