// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDRXHhBoO3_uvfDvqT3hLLZ_9O_DZ7aQGM",
  authDomain: "crud-application-a40d1.firebaseapp.com",
  projectId: "crud-application-a40d1",
  storageBucket: "crud-application-a40d1.appspot.app",
  messagingSenderId: "309112401160",
  appId: "1:309112401160:web:f13b210e3e019eba1490bd",
  measurementId: "G-MLLRE5EP8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); 

export { db} 


