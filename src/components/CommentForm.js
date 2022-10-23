//styles
import "./CommentForm.css";

import ReactStars from "react-rating-stars-component";
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { arrayUnion, Timestamp } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

const CommentForm = () => {
  const { mode } = useContext(ThemeContext);
  const { id } = useParams();
  const { user } = useAuthContext();
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(5);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      content: commentText,
      createdAt: Timestamp.fromDate(new Date()),
      userName: user.displayName,
      photoURL: user.photoURL,
      id: Math.random(),
      rating: rating,
    };

    try {
      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        comments: arrayUnion(commentToAdd),
      });
    } catch (err) {
      console.log(err.message);
    }
    setCommentText("");
    setRating(5);
  };

  return (
    <form className="comment-form" onSubmit={addCommentHandler}>
      <label>
        <span>Rate recipe</span>
        <ReactStars
          count={5}
          size={40}
          onChange={ratingChanged}
          activeColor="#ffd700"
          isHalf={true}
          value={5}
        />
      </label>
      <label>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </label>
      <button className={`auth-button ${mode}`}>Add a comment</button>
    </form>
  );
};

export default CommentForm;
