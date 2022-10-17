//styles
import "./RecipeList.css";

import React from "react";

const RecipeList = ({ data }) => {
  return (
    <div className="recipes-container">
      {data.map((recipe) => (
        <div key={recipe.id} className="single-recipe">
          <div className="header">
            <h2>{recipe.name}</h2>
            <em>Created by: {recipe.createdBy.userName}</em>
          </div>
          <p className="method">{recipe.method.substring(0, 100)}...</p>
          <p className="prep-time">{recipe.prepTime} mins to cook</p>
          <div className="button-holder">
            <button className="recipe-button">Cook this</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
