import logo from "../../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";

import "./Header.css";
function Header({loggedIn}) {
  const location=useLocation().pathname;

  return (
    <>
      {!loggedIn ? (
        <nav className="header header__main">
          <NavLink to={"/"} className="header__logo">
            <img src={logo} alt="логотип сайта в виде щита на зеленом фоне" />
          </NavLink>
          <ul className="header__container-main">
            <li className="header__container-registration">
              <NavLink to={"/signup"} className="header__link">
                Регистрация
              </NavLink>
            </li>
            <li >
              <NavLink to={"/signin"} className="header__link header__container-login">
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="header">
          <NavLink to={"/"} >
            <img
              src={logo}
              alt="логотип сайта в виде щита на зеленом фоне"
              className="header__logo"
            />
          </NavLink>
          <input id="menu__toggle" type="checkbox" />
          <label className="header__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul className="header__container">
            <li className="header__container-item">
              <NavLink to={"/"} className={`header__link ${location==='/' ? "header__link_active" : undefined}`}>
                Главная
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/movies"} className={`header__link ${location==='/movies' ? "header__link_active" : undefined}`} >
                Фильмы
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/saved-movies"} className={`header__link ${location==='/saved-movies' ? "header__link_active" : undefined}`} >
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/profile"} className={`header__link header__profile ${location==='/profile' ? "header__link_active" : undefined}`} >
                Аккаунт
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default Header;