// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpdY9ryLNkPI2k1u3rqOuACd81cyyCWYw",
  authDomain: "sticky-wall-todo-app-52da7.firebaseapp.com",
  projectId: "sticky-wall-todo-app-52da7",
  storageBucket: "sticky-wall-todo-app-52da7.appspot.com",
  messagingSenderId: "287865523019",
  appId: "1:287865523019:web:a68283d7c27fd8710236ce",
  measurementId: "G-HJ7GB23H2V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
export { analytics, auth, firestore }