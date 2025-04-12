// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANqi0_M00J_QAXJRRaIu4zULOOhRoHk7c",
  authDomain: "diploma-test1.firebaseapp.com",
  projectId: "diploma-test1",
  storageBucket: "diploma-test1.firebasestorage.app",
  messagingSenderId: "408991054741",
  appId: "1:408991054741:web:3cddc4fed38543af3fd49c",
  measurementId: "G-D69ZWD3Q2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// ✅ Only get analytics on client side
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };