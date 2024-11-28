import React from "react";
import { Categories } from "../../enums/apiEnums";
import { Link } from "react-router-dom";
import { capitalize } from "../../utils/Strings";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          src="/assets/starwarsLogo.png"
          alt="Star Wars Logo"
          className="logo"
        />
      </div>
      <div className="nav-links">
        <Link to={`/`} style={{ margin: "0 10px" }}>
          {capitalize("Home")}
        </Link>
        <Link to={`/search`} style={{ margin: "0 10px" }}>
          {capitalize("search")}
        </Link>
        {Object.values(Categories).map((category) => (
          <Link
            key={category}
            to={`/category/${category}`}
            style={{ margin: "0 10px" }}
          >
            {capitalize(category)}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
