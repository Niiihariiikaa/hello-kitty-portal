// src/firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJewZs7wzTzh9tm5u46QzHFJFWDPXLmwQ",
  authDomain: "portal-b5d46.firebaseapp.com",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export default firebase;
