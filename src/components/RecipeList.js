//styles
import "./RecipeList.css";
import deleteIcon from "../assets/delete-icon.svg";

import ReactStars from "react-rating-stars-component";
import React from "react";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const RecipeList = ({ data }) => {
  const { deleteDocument } = useFirestore("recipes");
  const { mode } = useContext(ThemeContext);

  const deleteHandler = (id) => {
    deleteDocument(id);
  };

  return (
    <div className={`recipes-container ${mode}`}>
      {data.map((recipe) => (
        <div key={recipe.id} className={`single-recipe ${mode}`}>
          {recipe.comments.length !== 0 && (
            <div className={`rating ${mode}`}>
              {(
                recipe.comments.reduce((acc, curr) => {
                  return acc + curr.rating;
                }, 0) / recipe.comments.length
              ).toFixed(1)}
              /5.0{" "}
              <ReactStars
                edit={false}
                size={25}
                isHalf={true}
                disabled={true}
                count={1}
                activeColor="#ffd700"
                value={1}
              />
            </div>
          )}
          <img
            src={deleteIcon}
            alt="bucket"
            className={`delete-icon ${mode}`}
            onClick={() => deleteHandler(recipe.id)}
          />
          <div className="header">
            <h2>{recipe.name}</h2>
            <em>Created by: {recipe.createdBy.userName}</em>
          </div>
          <p className="method">{recipe.method.substring(0, 80)}...</p>
          <p className="prep-time">{recipe.prepTime} mins to cook</p>

          <div className="button-holder">
            <Link to={`/recipes/${recipe.id}`} className="recipe-button">
              Cook this
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
