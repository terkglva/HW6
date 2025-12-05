// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBz--zcDGZsiF1Pkou2m3ppGJIxxXlJaro",
  authDomain: "dd-firebase-to-your-web-app.firebaseapp.com",
  projectId: "dd-firebase-to-your-web-app",
  storageBucket: "dd-firebase-to-your-web-app.firebasestorage.app",
  messagingSenderId: "335797634012",
  appId: "1:335797634012:web:db99f401f197507ea20519",
  measurementId: "G-715SG24CCT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);