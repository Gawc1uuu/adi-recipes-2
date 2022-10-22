import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";

export const useCollection = (col, _orderBy) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const order = useRef(_orderBy).current;

  useEffect(() => {
    let recipesRef = collection(db, col);

    if (order) {
      recipesRef = query(recipesRef, orderBy(...order));
    }

    setError(null);
    const unsub = onSnapshot(
      recipesRef,
      (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setData(result);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unsub();
  }, [col, order]);

  return { data, error };
};
