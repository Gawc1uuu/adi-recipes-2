import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useDocument = (col, doc_id) => {
  const [document, setDocument] = useState();
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(null);
    const docRef = doc(db, col, doc_id);
    const unsub = onSnapshot(
      docRef,
      (doc) => {
        setDocument(doc.data());
      },
      (err) => {
        setError(err.message);
      }
    );

    return () => unsub();
  }, [col, doc_id]);

  return { document, error };
};
