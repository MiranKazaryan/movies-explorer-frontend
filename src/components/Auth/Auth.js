import React from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.svg';


function Auth({
  title,
  inputs,
  button,
  span,
  isRegister,
  isValid,
  onSubmit,
  formError
  }) {

    const navigate = useNavigate();

  return(
    <section className="auth-container">
      <section className='auth'>
      <Link to="/" className="auth__logo-link"><img src={logo} alt='Логотип' /></Link>
      <h2 className='auth__form-heading'>{title}</h2>
      <form className="auth__form" onSubmit={onSubmit} noValidate>
        <div>{inputs}</div>
        <span className="auth__form-error">{formError}</span>
        <button type="submit" className={isValid?("auth__form-button"):
          ("auth__form-button auth__form-button_disabled")}>{button}</button>
      </form>
      <span className="auth__form-span">{span}
        {isRegister ? (
          <button className="auth__form-link" type="button" onClick={() => navigate("/signin")}>Войти</button>
        ): (
          <button className="auth__form-link" type="button" onClick={() => navigate("/signup")}>Регистрация</button>
        )}
      </span>
      </section>
      
    </section>
  );
}

export default Auth;