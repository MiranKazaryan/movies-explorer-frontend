import logo from "../../images/logo.svg";
import { NavLink } from "react-router-dom";
import "./Header.css";
function Header() {
  const loggedIn = true;
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
            <li className="header__container-login">
              <NavLink to={"/signin"} className="header__link">
                Войти
              </NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className="header">
          <NavLink to={"/"} className="header__logo">
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
              <NavLink to={"/"} className="header__link">
                Главная
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/movies"} className="header__link">
                Фильмы
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/saved-movies"} className="header__link">
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/profile"} className="header__link header__profile">
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

/*
          <NavLink to={"/"} className="header__logo">
            <img
              src={logo}
              alt="логотип сайта в виде щита на зеленом фоне"
              className="header__logo"
            />
          </NavLink>
          
          <input id="menu__toggle" type="checkbox" />
          <label class="menu__btn" for="menu__toggle">
            <span></span>
          </label>
          <ul class="menu__box">
            <li>
              <NavLink to={"/movies"} className="header__link menu__item">
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to={"/saved-movies"} className="header__link menu__item">
                Сохранённые фильмы
              </NavLink>
            </li>
            <li>
              <NavLink to={"/profile"} className="header__profile">
                Аккаунт
              </NavLink>
            </li>
          </ul>
          <ul className="header__container">
            <li className="header__container-item">
              <NavLink to={"/movies"} className="header__link">
                Фильмы
              </NavLink>
            </li>
            <li className="header__container-item">
              <NavLink to={"/saved-movies"} className="header__link">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <div className="header__icon">
            <NavLink to={"/profile"} className="header__profile">
              Аккаунт
            </NavLink>
          </div>*/
