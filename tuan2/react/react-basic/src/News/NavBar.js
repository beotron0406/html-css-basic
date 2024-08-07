import React from 'react';
import Logo from "./weblogo.png";

function Navbar() {
  return (
    <nav className="nav-title">
      <div className="web-logo">
        <img src={Logo} alt="weblogo" className="logo" />
        <div className="search-container">
          <form className="search-bar" action="#">
            <input
              type="text"
              name="Search"
              list="location"
              placeholder="Locations"
            />
            <datalist id="location">
              <option value="Ha noi"></option>
              <option value="Hai Phong"></option>
              <option value="Hung Yen"></option>
              <option value="Da Nang"></option>
              <option value="TP Ho Chi Minh"></option>
              <option value="Vung Tau"></option>
            </datalist>
          </form>
        </div>
      </div>
      <div className="web-user">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button type="submit">🔍</button>
          <a href="#" className="btn-signin">Sign in</a>
          <a href="#" className="btn-signup">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;