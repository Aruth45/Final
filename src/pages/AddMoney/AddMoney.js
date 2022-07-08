import { useState, useRef, useEffect } from "react";
import DashBoardNav from "../../components/DasboardNav/DashboardNav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input/Input";

function AddMoney() {
  const block = "sendmoney";
  const [userData, setUserData] = useState();
  const [formData, setFormData] = useState({
    origin: "",
    amount: "",
  });

  const [menu, setMenu] = useState(false);
  const selectRef = useRef();
  const navigate = useNavigate();

  const populateUser = async () => {
    const response = await fetch("http://localhost:4000/users/getuser", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    setUserData(data);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (data) => {
    const transferInfo = {
      ...formData,
      destination: data.destination,
      userID: userData.user._id,
    };

    

    fetch("http://localhost:4000/transactions/addmoney", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transferInfo),
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
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

      <form className={`${block}__form`}>
        <h2>Send Money</h2>
        {userData && (
          <select
            ref={selectRef}
            className={`${block}__select`}
            name="destination"
          >
            {userData &&
              userData.accounts.map((account, index) => (
                <option key={index} value={account.account}>
                  {account.account}
                </option>
              ))}
          </select>
        )}

        <div className={`${block}__input-container`}>
          <Input
            labelText="Origin account"
            placeholder=""
            name="origin"
            value={formData.origin}
            onChange={(e) => onChange(e)}
            error=""
          />

          <Input
            labelText="Transfer amount"
            placeholder=""
            name="amount"
            value={formData.amount}
            onChange={(e) => onChange(e)}
            error=""
          />
        </div>

        <button
          onClick={(e) => {
            handleSubmit({
              destination: selectRef.current.value,
            });
          }}
          type="button"
          className={`${block}__transfer-btn`}
        >
          Send Money
        </button>
      </form>

      <button
        onClick={() => setMenu(!menu)}
        type="button"
        className={`${block}__menu-btn`}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </div>
  );
}

export default AddMoney;
