import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faList,
  faFile,
  faMoneyBillTransfer,
  faHandHoldingDollar,
  faReceipt,
  faArrowRightFromBracket,
  faCreditCard,
  faBuildingColumns,
} from "@fortawesome/free-solid-svg-icons";

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
  }, []);

  return (
    <>
      {userData && (
        <div className={`${block}`}>
          <div className={`${block}__container`}>
            <aside className={`${block}__aside`}>
              <div className={`${block}__top`}>
                <div className={`${block}__logo`}>
                  <img
                    src="https://i.imgur.com/IHiVmil.png"
                    alt="Profile front face"
                    className={`${block}__img-logo`}
                  />
                  <h2 className={`${block}__h2 ${block}__text-muted`}>
                    Konrad<span className={`${block}__danger`}>Bank</span>
                  </h2>
                </div>

                <div className={`${block}__close`}>
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>

              <div className={`${block}__sidebar`}>
                <NavLink to="/" className={`${block}__link`}>
                  <FontAwesomeIcon
                    className={`${block}__sidebar-icon`}
                    icon={faList}
                  />
                  <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
                    DashBoard
                  </h3>
                </NavLink>

                <NavLink to="/" className={`${block}__link`}>
                  <FontAwesomeIcon
                    className={`${block}__sidebar-icon`}
                    icon={faFile}
                  />
                  <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
                    Account history
                  </h3>
                </NavLink>

                <NavLink to="/" className={`${block}__link`}>
                  <FontAwesomeIcon
                    className={`${block}__sidebar-icon`}
                    icon={faMoneyBillTransfer}
                  />
                  <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
                    Send money
                  </h3>
                </NavLink>

                <NavLink to="/" className={`${block}__link`}>
                  <FontAwesomeIcon
                    className={`${block}__sidebar-icon`}
                    icon={faHandHoldingDollar}
                  />
                  <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
                    Add money
                  </h3>
                </NavLink>

                <NavLink to="/" className={`${block}__link`}>
                  <FontAwesomeIcon
                    className={`${block}__sidebar-icon`}
                    icon={faReceipt}
                  />
                  <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
                    Services
                  </h3>
                </NavLink>

                <NavLink to="/" className={`${block}__link`}>
                  <FontAwesomeIcon
                    className={`${block}__sidebar-icon`}
                    icon={faArrowRightFromBracket}
                  />
                  <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
                    Logout
                  </h3>
                </NavLink>
              </div>
            </aside>

            <main className={`${block}__main-content`}>
              <h1>DashBoard</h1>

              <div className={`${block}__personal-accounts`}>
                <FontAwesomeIcon
                  className={`${block}__card-icon`}
                  icon={faCreditCard}
                />
                <div>
                  <h2 className={`${block}__h2`}>Personal accounts</h2>
                  <small className={`${block}__name`}>
                    {userData.user.fullname}
                  </small>
                </div>
              </div>

              {userData.accounts.map((account, index) => (
                <>
                  <div key={index} className={`${block}__insights`}>
                    <div className={`${block}__sales`}>
                      <FontAwesomeIcon
                        className={`${block}__bank-icon`}
                        icon={faBuildingColumns}
                      />

                      <div className={`${block}__middle`}>
                        <div className="left">
                          <h3 className={`${block}__h3`}>CR - Bank Acccount</h3>
                          <small className={`${block}__account-number`}>
                            Account: CR {account.account}
                          </small>
                        </div>

                        <strong className={`${block}__balance`}>
                          ₡{account.balance}
                        </strong>
                      </div>
                    </div>

                    <div className={`${block}__sales`}>
                      <FontAwesomeIcon
                        className={`${block}__bank-icon`}
                        icon={faBuildingColumns}
                      />

                      <div className={`${block}__middle`}>
                        <div className="left">
                          <h3 className={`${block}__h3`}>CR - Bank Acccount</h3>
                          <small className={`${block}__account-number`}>
                            Account: CR {account.account}
                          </small>
                        </div>
                        <strong className={`${block}__balance`}>
                          ₡{account.balance}
                        </strong>
                      </div>
                    </div>

                    <div className={`${block}__sales`}>
                      <FontAwesomeIcon
                        className={`${block}__bank-icon`}
                        icon={faBuildingColumns}
                      />

                      <div className={`${block}__middle`}>
                        <div className="left">
                          <h3 className={`${block}__h3`}>CR - Bank Acccount</h3>
                          <small className={`${block}__account-number`}>
                            Account: CR {account.account}
                          </small>
                        </div>
                        <strong className={`${block}__balance`}>
                          ₡{account.balance}
                        </strong>
                      </div>
                    </div>
                  </div>
                </>
              ))}

              <div className={`${block}__history`}>
                <h2 className={`${block}__history-heading`}>Account history</h2>

                <table className={`${block}__table`}>
                  <thead>
                    <tr>
                      <th>Daniel</th>
                      <th>Daniel</th>
                      <th>Daniel</th>
                      <th>Daniel</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                    </tr>

                    <tr>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                    </tr>

                    <tr>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                    </tr>

                    <tr>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                      <td className={`${block}__td`}>Some text</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoard;
