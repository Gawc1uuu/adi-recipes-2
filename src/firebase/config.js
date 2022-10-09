//import functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//config object
const firebaseConfig = {
  apiKey: "AIzaSyANs5h2iamPuJpBh6SXoaeZAwXz4fzTsnw",
  authDomain: "adi-recipes-2.firebaseapp.com",
  projectId: "adi-recipes-2",
  storageBucket: "adi-recipes-2.appspot.com",
  messagingSenderId: "491405074088",
  appId: "1:491405074088:web:22b4eeeab66dbe706eec9d",
};
//initialize app
const app = initializeApp(firebaseConfig);

//init services
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };
