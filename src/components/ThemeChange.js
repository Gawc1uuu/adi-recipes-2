import React from "react";
import themeIcon from "../assets/themeIcon.svg";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
//styles
import "./ThemeChange.css";

const ThemeChange = () => {
  const { mode, setMode } = useContext(ThemeContext);

  const modeChange = () => {
    setMode((prevState) => (prevState === "light" ? "dark" : "light"));
  };

  return (
    <div className="filter-container">
      <img
        onClick={modeChange}
        className={`filter-icon ${mode}`}
        src={themeIcon}
        alt="theme icon"
      />
    </div>
  );
};

export default ThemeChange;
