import "./CreateRecipe.css";

import { useState } from "react";

const CreateRecipe = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [method, setMethod] = useState("");
  const [prepTime, setPreptime] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      name,
      ingredients,
      method,
      prepTime,
    };

    console.log(recipe);
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <label>
        <span>Name of the recipe: </span>
        <input type="text" required onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        <span>Ingredients: </span>
        <input
          type="text"
          required
          onChange={(e) => setIngredients(e.target.value)}
        />
      </label>
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
