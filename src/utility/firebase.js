import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6_ZvS55tdsDxEpzDbtVFWf64i-8jif7Y",
  authDomain: "backend-ea7ad.firebaseapp.com",
  projectId: "backend-ea7ad",
  storageBucket: "backend-ea7ad.firebasestorage.app",
  messagingSenderId: "608737394872",
  appId: "1:608737394872:web:da10546931f25985c9f44d"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
