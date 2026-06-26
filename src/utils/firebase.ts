// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bronflix-react.firebaseapp.com",
  projectId: "bronflix-react",
  storageBucket: "bronflix-react.firebasestorage.app",
  messagingSenderId: "991830572273",
  appId: "1:991830572273:web:b889e9d614d5f79564bd50",
  measurementId: "G-PXJWG11CXC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth, database & storage
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();
