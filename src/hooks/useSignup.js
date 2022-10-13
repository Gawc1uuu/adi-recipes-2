import { useState } from "react";
import { auth, storage } from "../firebase/config";

export const useSignup = () => {
  const [isPendning, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (email, userName, password, photo) => {};

  return <div>useSignup</div>;
};
