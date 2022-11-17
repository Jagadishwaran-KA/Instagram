// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration



const firebaseConfig = {
    apiKey: "AIzaSyDNEz-ePsgyDPXX-A3u73ckPJpOBohrlb8",
    authDomain: "ig-2-ddb5b.firebaseapp.com",
    projectId: "ig-2-ddb5b",
    storageBucket: "ig-2-ddb5b.appspot.com",
    messagingSenderId: "650552333343",
    appId: "1:650552333343:web:b666bec9342d4ca30df12a"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();

const storage = getStorage();


export { app, db, storage };