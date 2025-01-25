// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO3-xHaTYwzKRiPX-z6ugPXb1i-U2pzBY",
  authDomain: "medicare-2ad94.firebaseapp.com",
  projectId: "medicare-2ad94",
  storageBucket: "medicare-2ad94.firebasestorage.app",
  messagingSenderId: "396993185664",
  appId: "1:396993185664:web:6f1cd9e02b9dc4d0006365",
  measurementId: "G-7BCL7E7PMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
