import React from "react";
import logo from "./../images/vector.svg";

function SignIn() {
  return (
    <>
    <header className="header">
      <img className="logo" src={logo} />
      <button className='button button_type_login'>Войти</button>
    </header>
        <div className="auth">
            <form className="auth__form form">
                <h2 className="form__header form__header_context_auth">Вход</h2>
                <input
                    type="text"
                    className="form__item form__item_context_auth form__item_el_email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                />
                <span className="form__span el-name-error"></span>
                <input
                    type="text"
                    className="form__item form__item_context_auth form__item_el_password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
                <span className="form__span about-me-error"></span>
                <button
                    type="submit"
                    className="button button_type_auth"
                    value="Войти"
                >Войти</button>
            </form>
        </div>
  </>
  );
}

export default SignIn;
