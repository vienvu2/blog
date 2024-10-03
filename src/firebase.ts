// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4LXo392P08LtvUXRnhBjXUWjql9TJAHY",
  authDomain: "blog-1af3c.firebaseapp.com",
  projectId: "blog-1af3c",
  storageBucket: "blog-1af3c.appspot.com",
  messagingSenderId: "752227503559",
  appId: "1:752227503559:web:f3b4817c355516eb39dde2",
  measurementId: "G-8XG0TSNG6N",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
