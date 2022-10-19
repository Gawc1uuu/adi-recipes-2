//styles
import "./CommentForm.css";

import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { arrayUnion, Timestamp } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useParams } from "react-router-dom";

const CommentForm = ({ recipe }) => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [commentText, setCommentText] = useState("");

  const addCommentHandler = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      content: commentText,
      createdAt: Timestamp.fromDate(new Date()),
      userName: user.displayName,
      photoURL: user.photoURL,
      id: Math.random(),
    };

    try {
      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        comments: arrayUnion(commentToAdd),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form className="comment-form" onSubmit={addCommentHandler}>
      <label>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </label>
      <button className="auth-button">Add a comment</button>
    </form>
  );
};

export default CommentForm;
