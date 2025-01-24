// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFf37rXOtI8O0Pfz_TsKzn9KQ6JLYadok",
  authDomain: "artemisuavwebsite.firebaseapp.com",
  databaseURL: "https://artemisuavwebsite-default-rtdb.firebaseio.com",
  projectId: "artemisuavwebsite",
  storageBucket: "artemisuavwebsite.firebasestorage.app",
  messagingSenderId: "1018877760562",
  appId: "1:1018877760562:web:f7d82a009e512d1166582b",
  measurementId: "G-1301DTCMNR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { app, analytics,firebaseConfig };