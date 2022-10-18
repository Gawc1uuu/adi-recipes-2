//styles
import "./Recipe.css";
import deleteIcon from "../../assets/delete-icon.svg";
import React from "react";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";

const Recipe = () => {
  const { id } = useParams();
  const { document, error } = useDocument("recipes", id);
  console.log(document);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="recipe">
      <img src={deleteIcon} alt="edit icon" className="edit-icon" />
      <div className="header">
        <h2>{document.name}</h2>
        <em>created by: {document.createdBy.userName}</em>
      </div>
      <ul className="ingredients">
        {document.ingredients.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
      <p className="method">{document.method}</p>
      <p className="cooking-time">{document.prepTime} minutes to make.</p>
    </div>
  );
};

export default Recipe;
