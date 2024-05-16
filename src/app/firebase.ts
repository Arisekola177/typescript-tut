


import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAquwTTelZaeeN3INAayNEr0SJKjKXru6I",
  authDomain: "fir-upload-2a6cc.firebaseapp.com",
  projectId: "fir-upload-2a6cc",
  storageBucket: "fir-upload-2a6cc.appspot.com",
  messagingSenderId: "899275209350",
  appId: "1:899275209350:web:a3edb5e2494cf0f86a6f07"
};


const app = initializeApp(firebaseConfig);

const storage = getStorage(app)


export {storage}







