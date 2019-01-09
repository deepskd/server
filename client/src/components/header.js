import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui secondary pointing fluid huge menu">
      <Link to="/" className="item">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
          alt="logo"
        />
        TEAMS
      </Link>
    </div>
  );
};

export default Header;
