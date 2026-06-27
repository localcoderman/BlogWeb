// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "techfoanalyzer.firebaseapp.com",
  projectId: "techfoanalyzer",
  storageBucket: "techfoanalyzer.firebasestorage.app",
  messagingSenderId: "417596928438",
  appId: "1:417596928438:web:8bceedf66b450e82121117"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);


const Auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {Auth,provider}