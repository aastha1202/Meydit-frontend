// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt7cdOJ-H-OJ5hCVPKEKX2n6b_itfpAqQ",
  authDomain: "imageupload-8cf9e.firebaseapp.com",
  projectId: "imageupload-8cf9e",
  storageBucket: "imageupload-8cf9e.appspot.com",
  messagingSenderId: "665184213498",
  appId: "1:665184213498:web:98c6b804ade215ccc8ac43",
  measurementId: "G-0B56H93Z2S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
