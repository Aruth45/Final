import { useEffect, useState } from "react";
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
  faBars,
  faSun,
  faMoon,
  faWater,
  faBoltLightning,
  faPhone,
  faWifi,
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

  const handlelogout = () => {
    localStorage.removeItem("token");
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
                  <h2 className={`${block}__text-logo`}>
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

                <NavLink
                  onClick={handlelogout}
                  to="/login"
                  className={`${block}__link`}
                >
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

            <main>
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
                  <div key={index} className={`${block}__account-container`}>
                    <div className={`${block}__sales`}>
                      <FontAwesomeIcon
                        className={`${block}__bank-icon`}
                        icon={faBuildingColumns}
                      />

                      <div className={`${block}__account-middle`}>
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

                      <div className={`${block}__account-middle`}>
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

                      <div className={`${block}__account-middle`}>
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
                      <th className={`${block}__th`}>Action</th>
                      <th className={`${block}__th`}>Amount</th>
                      <th className={`${block}__th`}>Destination</th>
                      <th className={`${block}__th`}>Date</th>
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

            <div className={`${block}__right`}>
              <div className={`${block}__top-right`}>
                <button className={`${block}__menu-btn`}>
                  <FontAwesomeIcon icon={faBars} />
                </button>

                <div className={`${block}__theme-toggler`}>
                  <FontAwesomeIcon
                    className={`${block}__theme-btn light`}
                    icon={faSun}
                  />
                  <FontAwesomeIcon
                    className={`${block}__theme-btn`}
                    icon={faMoon}
                  />
                </div>

                <div className={`${block}__profile`}>
                  <div className={`${block}__profile.info`}>
                    <p className={`${block}__name`}>
                      Hey
                      <strong> {userData.user.fullname.split(" ")[0]}</strong>
                    </p>
                  </div>
                  <div className={`${block}__profile-phone`}>
                    <img
                      className={`${block}__profile-pic`}
                      src={userData.user.profilePic}
                      alt="Profile front face"
                    />
                  </div>
                </div>
              </div>

              <div className={`${block}__recent-credits`}>
                <h2>Recent credits</h2>
                <div className={`${block}__credits`}>
                  <div className={`${block}__credit`}>
                    <div className={`${block}__credit-info`}>
                      <p>$100+</p>
                      <small>23/08/2008</small>
                    </div>
                    <div className={`${block}__credit-info`}>
                      <p>$100+</p>
                      <small>23/08/2008</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${block}__services`}>
                <h2 className={`${block}__h2`}>Services</h2>

                <div className={`${block}__services-item`}>
                  <div className={`${block}__light-primary`}>
                    <FontAwesomeIcon icon={faWater} />
                  </div>

                  <div className={`${block}__services-info-container`}>
                    <div className={`${block}__services-info`}>
                      <h3 className={`${block}__h3`}>Water</h3>
                      <small className={`${block}__services-water`}>300</small>
                    </div>
                  </div>
                </div>

                <div className={`${block}__services-item`}>
                  <div className={`${block}__warning`}>
                    <FontAwesomeIcon icon={faBoltLightning} />
                  </div>

                  <div className={`${block}__services-info-container`}>
                    <div className={`${block}__services-info`}>
                      <h3 className={`${block}__h3`}>Power</h3>
                      <small className={`${block}__services-power`}>300</small>
                    </div>
                  </div>
                </div>

                <div className={`${block}__services-item`}>
                  <div className={`${block}__primary`}>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>

                  <div className={`${block}__services-info-container`}>
                    <div className={`${block}__services-info`}>
                      <h3 className={`${block}__h3`}>Phone</h3>
                      <small className={`${block}__services-phone`}>300</small>
                    </div>
                  </div>
                </div>

                <div className={`${block}__services-item`}>
                  <div className={`${block}__secondary`}>
                    <FontAwesomeIcon icon={faWifi} />
                  </div>

                  <div className={`${block}__services-info-container`}>
                    <div className={`${block}__services-info`}>
                      <h3 className={`${block}__h3`}>Internet</h3>
                      <small className={`${block}__services-internet`}>
                        300
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoard;
