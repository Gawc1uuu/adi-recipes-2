//styles
import "./CommentsList.css";

import ReactStars from "react-rating-stars-component";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const CommentsList = ({ recipe }) => {
  const { mode } = useContext(ThemeContext);

  return (
    <div>
      <h4>Recipe reviews</h4>
      {recipe.comments.length === 0 && <p>no reviews yet!</p>}
      {recipe.comments.length !== 0 && (
        <ul className="comments">
          {recipe.comments.map((comment) => (
            <li className={`comment ${mode}`} key={comment.id}>
              <div className="comment-header">
                <img src={comment.photoURL} alt="comment author" />
                <h5>{comment.userName}</h5>
              </div>
              <ReactStars
                edit={false}
                size={15}
                isHalf={true}
                value={comment.rating}
                disabled={true}
              />
              <p className="comment-content">{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentsList;
