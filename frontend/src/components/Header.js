import React from "react";
import logo from '../images/logo.svg';
import { Link, Route } from "react-router-dom";

function Header({ onSignOut, email }) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <Route path="/main">
        <div className="header__container">
        <p className="header__email">{email}</p>
        <button onClick={onSignOut} to={"sign-up"} className="header__sign-out">
          Выйти
        </button>
        </div>
      </Route>
      <Route path="/sign-in">
        <Link to={"sign-up"} className="header__sign">
          Регистрация
        </Link>
      </Route>
      <Route path="/sign-up">
        <Link to={"sign-in"} className="header__sign">
          Войти
        </Link>
      </Route>
    </header>
  )
}

export default Header;