import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyCSKhkdRQLeBvuSRnr2sO_1IXlI42wo1nE",

  authDomain: "cuisinecraft-hub-restaurant.firebaseapp.com",

  projectId: "cuisinecraft-hub-restaurant",

  storageBucket: "cuisinecraft-hub-restaurant.appspot.com",

  messagingSenderId: "846322275342",

  appId: "1:846322275342:web:08d01dd33134103731985f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app};