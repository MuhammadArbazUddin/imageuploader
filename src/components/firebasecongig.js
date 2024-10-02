// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAMdlbB7v4LUbC0gsnfqGdM1ZYioZIu9K4",
  authDomain: "imageuploader-e55b5.firebaseapp.com",
  projectId: "imageuploader-e55b5",
  storageBucket: "imageuploader-e55b5.appspot.com",
  messagingSenderId: "350812027423",
  appId: "1:350812027423:web:780c338223575e4fe7332a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
