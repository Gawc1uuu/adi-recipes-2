import { useReducer } from "react";
import { db } from "../firebase/config";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  collection,
} from "firebase/firestore";

const initState = {
  document: null,
  isPending: false,
  success: false,
  error: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { ...state, isPending: true };
    case "ADD_DOC":
      return {
        addedDocument: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "DELETE_DOC":
      return {
        document: null,
        isPending: false,
        success: true,
        error: null,
      };
    case "UPDATE_DOC":
      return {
        document: action.payload,
        isPending: false,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        success: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};

export const useFirestore = (col) => {
  const [state, dispatch] = useReducer(firestoreReducer, initState);

  const addDocument = async (document) => {
    const docRef = collection(db, col);
    dispatch({ type: "IS_PENDING" });
    try {
      const res = await addDoc(docRef, document);
      console.log(res, res.data().id);
      dispatch({ type: "ADD_DOC", payload: res });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));
      dispatch({ type: "DELETED_DOC" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  const updateDocument = async (id, update) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await updateDoc(doc(db, col, id), update);
      dispatch({ type: "UPDATE_DOC" });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  console.log(state.error);

  return { addDocument, deleteDocument, updateDocument, ...state };
};
