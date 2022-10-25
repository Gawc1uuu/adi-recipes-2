//styles
import "./Recipe.css";
import editIcon from "../../assets/edit-icon.svg";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useAuthContext } from "../../hooks/useAuthContext";
import CommentsList from "../../components/CommentsList";
import CommentForm from "../../components/CommentForm";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { GridLoader } from "react-spinners";

const Recipe = () => {
  const { mode } = useContext(ThemeContext);
  const { user } = useAuthContext();
  const { id } = useParams();
  const { document, error } = useDocument("recipes", id);

  if (error) {
    return (
      <div className="info-container">
        <p className={`error ${mode}`}>{error}</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="info-container">
        <p className={`loading ${mode}`}>
          <GridLoader
            color={`#999`}
            loading={true}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </p>{" "}
      </div>
    );
  }

  return (
    <div className="recipe-page-container">
      <div className={`recipe ${mode}`}>
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
        {user && <CommentForm recipe={document} />}
        {!user && <p>Log in to write comments!</p>}
      </div>
    </div>
  );
};

export default Recipe;
