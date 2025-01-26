// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVIxBPs6YpyopawpdCYKKLcSWG5dCCnmY",
  authDomain: "netflixgpt-3a01d.firebaseapp.com",
  projectId: "netflixgpt-3a01d",
  storageBucket: "netflixgpt-3a01d.firebasestorage.app",
  messagingSenderId: "882809435817",
  appId: "1:882809435817:web:0beb98b4c094b4616f9bb8",
  measurementId: "G-T0PL1Y5RLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export default auth;