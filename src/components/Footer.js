import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
//styles
import "./Footer.css";

const Footer = () => {
  const { mode } = useContext(ThemeContext);
  return (
    <div className={`footer ${mode}`}>
      <h4>Site made by Gawc1uuu</h4>
      <p>Check out more of my work: </p>
      <ul>
        <li>
          <a href="https://github.com/Gawc1uuu">GITHUB</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/jakub-gawlik-7b7465248/">
            LINKEDIN
          </a>
        </li>
        <li>Contact me: gawlikjakub9@gmail.com</li>
      </ul>
    </div>
  );
};

export default Footer;
