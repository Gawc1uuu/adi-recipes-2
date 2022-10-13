import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, storage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [isPendning, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email, userName, password, photo) => {
    setIsPending(true);
    setError(null);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        setError("could not sign up");
      }

      const avatarRef = ref(storage, `images/${res.user.uid}/${photo.name}`);

      uploadBytes(avatarRef, photo).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("profile updated!");
            })
            .catch((err) => {
              throw new Error(err);
            });
        });
      });

      dispatch({ type: "LOGIN", payload: res.user });

      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return { error, isPendning, signup };
};
