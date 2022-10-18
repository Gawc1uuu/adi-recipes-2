//styles
import "./Recipe.css";
import deleteIcon from "../../assets/delete-icon.svg";
import React from "react";

const Recipe = () => {
  return (
    <div className="recipe">
      <img src={deleteIcon} alt="edit icon" className="delete-icon" />
      <div>
        <h2>Recipe title</h2>
        <em>created by: user</em>
      </div>
      <p>recipe ingredients</p>
      <p>recipe method</p>
      <p>cooking time</p>
    </div>
  );
};

export default Recipe;
