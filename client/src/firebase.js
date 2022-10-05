import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mytube-f4f9b.firebaseapp.com",
  projectId: "mytube-f4f9b",
  storageBucket: "mytube-f4f9b.appspot.com",
  messagingSenderId: "404018950696",
  appId: "1:404018950696:web:dfccd168ed845d62f1fb1d",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
