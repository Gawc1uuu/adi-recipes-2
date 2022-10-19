//styles
import "./CommentsList.css";

import React from "react";

const CommentsList = ({ recipe }) => {
  return (
    <>
      <h4>Recipe reviews</h4>
      {recipe.comments.length === 0 && <p>no reviews yet!</p>}
      {recipe.comments.length !== 0 && (
        <ul className="comments">
          {recipe.comments.map((comment) => (
            <li className="comment">comment</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CommentsList;
