import { db } from "../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export const useCollection = (col) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    const unsub = onSnapshot(
      collection(db, col),
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
  }, [col]);

  return { data, error };
};
