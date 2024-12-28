// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjuOoUeVpLMoifiuTdqz3lUWDBIIOPRzg",
  authDomain: "notion-clone-a4b82.firebaseapp.com",
  projectId: "notion-clone-a4b82",
  storageBucket: "notion-clone-a4b82.firebasestorage.app",
  messagingSenderId: "234225211977",
  appId: "1:234225211977:web:6da8af5dc2c4f2271abd98",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
