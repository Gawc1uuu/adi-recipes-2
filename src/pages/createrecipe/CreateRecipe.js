import "./CreateRecipe.css";

import { useState, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { addDocument } = useFirestore("recipes");
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIng, setNewIng] = useState("");
  const [method, setMethod] = useState("");
  const [prepTime, setPreptime] = useState();
  const ingsInput = useRef(null);

  const removeIng = (index) => {
    setIngredients((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  };

  const handleAdd = (e) => {
    const ing = newIng.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients((prevState) => [...prevState, ing]);
    }
    setNewIng("");
    ingsInput.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      name,
      ingredients,
      method,
      prepTime,
      comments: [],
      createdAt: serverTimestamp(),
      createdBy: user.uid,
    };

    addDocument(recipe);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <label>
        <span>Name of the recipe: </span>
        <input type="text" required onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <span>Ingredients: </span>
        <div className="ingredients-input">
          <input
            type="text"
            onChange={(e) => setNewIng(e.target.value)}
            value={newIng}
            ref={ingsInput}
          />
          <button onClick={handleAdd} type="button" className="auth-button">
            Add
          </button>
        </div>
      </label>
      <p className="ings-list">
        Current ingredients:
        {ingredients.map((ing) => (
          <em
            key={ing}
            onClick={() => removeIng(ingredients.indexOf(ing))}
            className="ings-item"
          >
            {ing}
          </em>
        ))}
      </p>
      <label>
        <span>Preparation method: </span>
        <textarea
          type="text"
          required
          onChange={(e) => setMethod(e.target.value)}
        />
      </label>
      <label>
        <span>Cooking time: </span>
        <input
          type="number"
          required
          onChange={(e) => setPreptime(e.target.value)}
        />
      </label>
      <div className="button-holder">
        <button className="signup-button">Add a recipe</button>
      </div>
    </form>
  );
};

export default CreateRecipe;
