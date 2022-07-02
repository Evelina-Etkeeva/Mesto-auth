import React from "react";
import logo from "./../images/vector.svg";

function Signin({onSignin}) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      onSignin({
        password: password,
        email: email,
      });
    }
  
    function handleChangeEmail(e) {
      setEmail(e.target.value);
    }
  
    function handleChangePassword(e) {
      setPassword(e.target.value);
    }
    return (
    <>
      <header className="header">
        <img className="logo" src={logo} />
        <button className="button button_type_login">Войти</button>
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
            onChange={handleChangeEmail}
            value={email}
            required
          />
          <span className="form__span el-name-error"></span>
          <input
            type="text"
            className="form__item form__item_context_auth form__item_el_password"
            id="password"
            name="password"
            placeholder="Пароль"
            onChange={handleChangePassword}
            value={password}
            required
          />
          <span className="form__span about-me-error"></span>
          <button
            type="submit"
            className="button button_type_auth"
            value="Войти"
            onClick={handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Signin;
