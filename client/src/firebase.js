// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Import the API key from the environment variables
  authDomain: "devjourney-blog-349d3.firebaseapp.com",
  projectId: "devjourney-blog-349d3",
  storageBucket: "devjourney-blog-349d3.appspot.com",
  messagingSenderId: "299517502230",
  appId: "1:299517502230:web:519ddc80fc814c6dcf2637"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);