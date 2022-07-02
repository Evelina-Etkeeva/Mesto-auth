import logo from "./../images/vector.svg";

function Header({onLogoutClick}) {
  return (
    <header className="header">
      <img className="logo" src={logo} />
      <p className="header__email">test.email</p>
      <button className="button button_type_logout" type="button" onClick={onLogoutClick}>Выйти</button>
    </header>
  );
}

export default Header;
