import { useState, useEffect, useRef } from "react";
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

function Services() {
  const [userData, setUserData] = useState();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const block = "services";
  const selectRef = useRef();
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

  const handleSubmit = (data) => {
    fetch("http://localhost:4000/transactions/payment", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  };

  return (
    <div className={`${block}`}>
      <DashBoardNav menu={menu} setMenu={setMenu} />

      <form className={`${block}__container`}>
        <h2>Services</h2>
        <button
          onClick={() => setMenu(!menu)}
          type="button"
          className={`${block}__menu-btn`}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <select ref={selectRef} className={`${block}__select`} name="origin">
          {userData &&
            userData.accounts.map((account, index) => (
              <option key={index} value={account.account}>
                {account.account}
              </option>
            ))}
        </select>
        {userData &&
          userData.services.map((service, index) => (
            <div key={index} className={`${block}__item`}>
              <div
                className={
                  service.category === "water"
                    ? `${block}__water`
                    : service.category === "power"
                    ? `${block}__power`
                    : service.category === "internet"
                    ? `${block}__internet`
                    : `${block}__phone`
                }
              >
                <FontAwesomeIcon
                  icon={
                    service.category === "water"
                      ? faWater
                      : service.category === "power"
                      ? faBoltLightning
                      : service.category === "internet"
                      ? faWifi
                      : faPhone
                  }
                />
              </div>

              <div className={`${block}__info-container`}>
                <div className={`${block}__info`}>
                  <h3 className={`${block}__h3`}>{service.category}</h3>
                  <p
                    className={
                      service.category === "water"
                        ? `${block}__water`
                        : service.category === "power"
                        ? `${block}__power`
                        : service.category === "internet"
                        ? `${block}__internet`
                        : `${block}__phone`
                    }
                  >
                    {service.company}
                  </p>
                  <p
                    className={
                      service.category === "water"
                        ? `${block}__water`
                        : service.category === "power"
                        ? `${block}__power`
                        : service.category === "internet"
                        ? `${block}__internet`
                        : `${block}__phone`
                    }
                  >
                    ₡{service.amount}
                  </p>

                  <button
                    onClick={(e) =>
                      handleSubmit({
                        origin: selectRef.current.value,
                        amount: service.amount,
                        serviceID: service._id,
                        userID: userData.user._id,
                      })
                    }
                    className={`${block}__pay-btn`}
                    type="button"
                  >
                    Pay
                  </button>
                </div>
              </div>
            </div>
          ))}
      </form>
    </div>
  );
}

export default Services;
