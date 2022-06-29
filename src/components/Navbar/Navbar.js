import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const block = "navbar";
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [menu]);

  return (
    <>
      <nav
        aria-label="Navigation main menu"
        role="navigation"
        className={`${block}`}
      >
        <NavLink aria-label="Go to home page" to="/">
          <img
            alt="Company's logo"
            className={`${block}__logo`}
            src="https://i.imgur.com/IHiVmil.png"
          ></img>
        </NavLink>

        <button
          title={menu ? "Close main menu" : "Open main menu"}
          aria-haspopup="menu"
          aria-label={menu ? "Close main menu" : "Open main menu"}
          aria-expanded={menu ? true : false}
          onClick={() => setMenu(!menu)}
          className={`${block}__btn`}
        >
          <div
            className={
              menu
                ? `${block}__burger ${block}__burger--open`
                : `${block}__burger`
            }
          ></div>
        </button>
        <ul role="menu" className={`${block}__list`}>
          <li role="presentation" className={`${block}__item`}>
            <NavLink className={`${block}__link`} role="menuitem" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

      <div
        aria-hidden={menu ? "false" : "true"}
        className={
          menu ? `${block}__mobile ${block}__mobile--show` : `${block}__mobile`
        }
      >
        <h2 className={`${block}__title-menu`}>Options</h2>
        <ul role="menu" className={`${block}__list-mobile`}>
          <li className={`${block}__item`} role="presentation">
            <NavLink
              tabIndex={menu ? "1" : "-1"}
              onClick={() => setMenu(!menu)}
              className={`${block}__link`}
              role="menuitem"
              to="/create_account"
            >
              Create Account
            </NavLink>
          </li>
          <li className={`${block}__item`} role="presentation">
            <NavLink
              tabIndex={menu ? "1" : "-1"}
              onClick={() => setMenu(!menu)}
              className={`${block}__link`}
              role="menuitem"
              to="/login"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
