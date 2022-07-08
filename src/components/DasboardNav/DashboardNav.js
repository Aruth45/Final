import { NavLink } from "react-router-dom";
import useBreakPoint from "../../hooks/useBreakPoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faXmark,
  faList,
  faFile,
  faMoneyBillTransfer,
  faHandHoldingDollar,
  faReceipt,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function DashBoardNav({ menu, setMenu }) {
  const breakPoint = useBreakPoint();
  const block = "dashboard";

  const handlelogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <aside
      className={
        breakPoint === "sm" && menu
          ? `${block}__aside ${block}__aside-show`
          : breakPoint === "sm" && !menu
          ? `${block}__aside ${block}__aside-hide`
          : `${block}__aside`
      }
    >
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

        <button
          onClick={() => setMenu(!menu)}
          className={`${block}__close-btn`}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>

      <div className={`${block}__sidebar`}>
        <NavLink to="/dashboard" className={`${block}__link`}>
          <FontAwesomeIcon className={`${block}__sidebar-icon`} icon={faList} />
          <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
            DashBoard
          </h3>
        </NavLink>

        <NavLink to="/history" className={`${block}__link`}>
          <FontAwesomeIcon className={`${block}__sidebar-icon`} icon={faFile} />
          <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
            Account history
          </h3>
        </NavLink>

        <NavLink to="/transfers" className={`${block}__link`}>
          <FontAwesomeIcon
            className={`${block}__sidebar-icon`}
            icon={faMoneyBillTransfer}
          />
          <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
            Send money
          </h3>
        </NavLink>

        <NavLink to="/addmoney" className={`${block}__link`}>
          <FontAwesomeIcon
            className={`${block}__sidebar-icon`}
            icon={faHandHoldingDollar}
          />
          <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>
            Add money
          </h3>
        </NavLink>

        <NavLink to="/services" className={`${block}__link`}>
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
          <h3 className={`${block}__h3 ${block}__sidebar-paragraph`}>Logout</h3>
        </NavLink>
      </div>
    </aside>
  );
}

export default DashBoardNav;
