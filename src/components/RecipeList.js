//styles
import "./RecipeList.css";
import deleteIcon from "../assets/delete-icon.svg";

import ReactStars from "react-rating-stars-component";
import React from "react";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const RecipeList = ({ data }) => {
  const { deleteDocument } = useFirestore("recipes");

  const deleteHandler = (id) => {
    deleteDocument(id);
  };

  return (
    <div className="recipes-container">
      {data.map((recipe) => (
        <div key={recipe.id} className="single-recipe">
          {recipe.comments.length !== 0 && (
            <div className="rating">
              {recipe.comments.reduce((acc, curr) => acc + curr.rating, 0) /
                recipe.comments.length}
              /5{" "}
              <ReactStars
                edit={false}
                size={25}
                isHalf={true}
                disabled={true}
                count={1}
              />
            </div>
          )}
          <img
            src={deleteIcon}
            alt="bucket"
            className="delete-icon"
            onClick={() => deleteHandler(recipe.id)}
          />
          <div className="header">
            <h2>{recipe.name}</h2>
            <em>Created by: {recipe.createdBy.userName}</em>
          </div>
          <p className="method">{recipe.method.substring(0, 100)}...</p>
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
