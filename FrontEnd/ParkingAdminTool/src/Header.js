import React from "react";
import logo from "./FPVT.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <img src={logo} className="logo" alt="logo" />
      <ul className="menu-ul">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
