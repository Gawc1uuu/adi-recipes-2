import { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import spaghetti from "../assets/spaghetti.svg";

//styles
import "./Navbar.css";

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars size={20} onClick={showSidebar} />
          </Link>
          <Link to="/" className="brand">
            <img src={spaghetti} className="food-icon" alt="food icon" />
            <h1>Adi Cooking</h1>
          </Link>
          <div className="auth-links">
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
            <button className="auth-button">Logout</button>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul onClick={showSidebar} className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose size={20} />
              </Link>
            </li>
            <li className="user">Hey, user!</li>
            <li className="nav-text">
              <Link to="/">
                <AiIcons.AiFillHome />
                <span>Home</span>
              </Link>
            </li>
            <li className="nav-text">
              <Link to="/create">
                <AiIcons.AiOutlinePlus />
                <span>Add Recipe</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
