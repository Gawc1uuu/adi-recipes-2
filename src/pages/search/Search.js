import RecipeList from "../../components/RecipeList";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { onSnapshot, query, where, collection } from "firebase/firestore";
//styles

const Search = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  const location = useLocation();
  const locationParams = new URLSearchParams(location.search);
  const queryStr = locationParams.get("q");

  useEffect(() => {
    setIsPending(true);
    setData(null);
    const q = query(
      collection(db, "recipes"),
      where("name", "==", `${queryStr}`)
    );
    const unsub = onSnapshot(
      q,
      (querySnapshot) => {
        const recipes = [];
        querySnapshot.forEach((doc) => {
          recipes.push({ ...doc.data(), id: doc.id });
        });
        setData(recipes);
        setIsPending(false);
        setError(null);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unsub();
  }, [queryStr]);

  return (
    <>
      {error && (
        <div className="info-container">
          <p className="error">{error}</p>
        </div>
      )}
      {isPending && (
        <div className="info-container">
          <p className="loading">Loading..</p>
        </div>
      )}
      {data && data.length !== 0 && <RecipeList data={data} />}
      {data && data.length === 0 && (
        <div className="info-container">
          <p className="notFound">no recipes found</p>
        </div>
      )}
    </>
  );
};

export default Search;
