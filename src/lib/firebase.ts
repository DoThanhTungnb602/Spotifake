// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDveFuQLZeN5zviHgXJP_rX2rjktcgFY3Y",
  authDomain: "spotifake-602.firebaseapp.com",
  projectId: "spotifake-602",
  storageBucket: "spotifake-602.appspot.com",
  messagingSenderId: "914592769743",
  appId: "1:914592769743:web:c31492d785344ab63a79ba",
  measurementId: "G-83Q84CYGQZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
