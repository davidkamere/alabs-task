// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaz2lMwamu8AUg73hHCPUvW4tuqT90hDM",
  authDomain: "alabs-5b029.firebaseapp.com",
  projectId: "alabs-5b029",
  storageBucket: "alabs-5b029.appspot.com",
  messagingSenderId: "707416139739",
  appId: "1:707416139739:web:fd6dc6e5d88eb8ef9be9fe"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const storage = getStorage()

export { app, db, storage}