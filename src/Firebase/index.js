// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYcykWwUY0YnjYtrTyXArfEFLmyzkPj4o",
  authDomain: "fir-midterm-acf30.firebaseapp.com",
  projectId: "fir-midterm-acf30",
  storageBucket: "fir-midterm-acf30.appspot.com",
  messagingSenderId: "339309967705",
  appId: "1:339309967705:web:103bf48fdd771c1c2f7448",
  measurementId: "G-LBEX33PMC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {db};
export {auth};