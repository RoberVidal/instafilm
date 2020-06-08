/*export default {
  apiKey: "AIzaSyAdChZzsQqCEK1WDmOLTvp_-0yYKtu-Tew",
  authDomain: "instafilm-7645d.firebaseapp.com",
  databaseURL: "https://instafilm-7645d.firebaseio.com",
  projectId: "instafilm-7645d",
  storageBucket: "instafilm-7645d.appspot.com",
  messagingSenderId: "456797739796",
  appId: "1:456797739796:web:25af0511280d8d6b730001",
  measurementId: "G-GDRS37M45L"
};*/

import Firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdChZzsQqCEK1WDmOLTvp_-0yYKtu-Tew",
  authDomain: "instafilm-7645d.firebaseapp.com",
  databaseURL: "https://instafilm-7645d.firebaseio.com",
  projectId: "instafilm-7645d",
  storageBucket: "instafilm-7645d.appspot.com",
  messagingSenderId: "456797739796",
  appId: "1:456797739796:web:25af0511280d8d6b730001",
  measurementId: "G-GDRS37M45L"
};

const firebaseApp = Firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
