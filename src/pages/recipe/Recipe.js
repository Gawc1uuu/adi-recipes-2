//styles
import "./Recipe.css";
import editIcon from "../../assets/edit-icon.svg";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import CommentsList from "../../components/CommentsList";
import CommentForm from "../../components/CommentForm";

let ratingSum = 0;

const Recipe = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { document, error } = useDocument("recipes", id);

  useEffect(() => {
    if (document) {
      document.comments.forEach((comment) => {
        ratingSum += comment.rating;
      });
      console.log(ratingSum);
    }
  }, [document]);

  if (error) {
    return (
      <div className="info-container">
        <p className="error">{error}</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="info-container">
        <p className="loading">Loading...</p>{" "}
      </div>
    );
  }

  return (
    <div className="recipe-page-container">
      <div className="recipe">
        {user && user.uid === document.createdBy.id && (
          <Link to={`/recipes/${id}/edit`}>
            <img src={editIcon} alt="edit icon" className="edit-icon" />
          </Link>
        )}
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
      <div className="recipe-comments">
        <CommentsList recipe={document} />
        <CommentForm recipe={document} />
      </div>
    </div>
  );
};

export default Recipe;
