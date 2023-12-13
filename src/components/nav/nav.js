import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ match }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Recipes">Recipes</Link>
        </li>
        {/* Other links */}
      </ul>
    </nav>
  );
};

export default Navbar;
