import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: import.meta.env.VITE_APIKEY,

  authDomain: import.meta.env.VITE_AUTHDOMAIN,

  projectId: import.meta.env.VITE_PROJECTID,

  storageBucket: import.meta.env.VITE_STORAGEBUCKET,

  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,

  appId: import.meta.env.VITE_APPIDVITE
}
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth,app};