import { useState, useRef, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { serverTimestamp } from "firebase/firestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const { document } = useDocument("recipes", id);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { updateDocument, error } = useFirestore("recipes");
  const [name, setName] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [newIng, setNewIng] = useState("");
  const [method, setMethod] = useState();
  const [prepTime, setPreptime] = useState();
  const ingsInput = useRef(null);

  useEffect(() => {
    if (document) {
      setName(document.name);
      setIngredients([...document.ingredients]);
      setMethod(document.method);
      setPreptime(document.prepTime);
    }
  }, [document]);

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

    const createdBy = {
      userName: user.displayName,
      id: user.uid,
      photoURL: user.photoURL,
    };

    const recipe = {
      name,
      ingredients,
      method,
      prepTime,
      createdAt: serverTimestamp(),
      createdBy,
    };

    if (!error) {
      updateDocument(id, recipe);
      navigate(`/recipes/${id}`);
      return;
    } else {
      console.log(error);
    }
  };

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <label>
        <span>Name of the recipe: </span>
        <input
          type="text"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
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
          value={method}
        />
      </label>
      <label>
        <span>Cooking time: </span>
        <input
          type="number"
          required
          onChange={(e) => setPreptime(e.target.value)}
          value={prepTime}
        />
      </label>
      <div className="button-holder">
        <button className="signup-button">Save</button>
      </div>
    </form>
  );
};

export default Edit;
