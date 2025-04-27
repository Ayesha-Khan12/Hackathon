import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAp_yXr2hSVFLi_E-o3SbVan9OuS0xnU4M",
    authDomain: "hackathon-17dc9.firebaseapp.com",
    projectId: "hackathon-17dc9",
    storageBucket: "hackathon-17dc9.firebasestorage.app",
    messagingSenderId: "1060576129146",
    appId: "1:1060576129146:web:947e715510de3a39f7cbc3",
    measurementId: "G-HQVV8NKEL2"
  };  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
