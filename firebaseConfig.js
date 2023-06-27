import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKLqXZuiP51RdxQQ0gVcvNeM6C5DIlnl4",
  authDomain: "comparte-itd.firebaseapp.com",
  projectId: "comparte-itd",
  storageBucket: "comparte-itd.appspot.com",
  messagingSenderId: "1036396580720",
  appId: "1:1036396580720:web:09963e3f1e62a8ec8f49b5",
  measurementId: "G-D3VW493LRR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);
const analytics = getAnalytics(app);