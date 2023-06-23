import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt68yKdB730M7kJPgV3Nz7vDKi6NAfIXM",
  authDomain: "my-task-983d0.firebaseapp.com",
  projectId: "my-task-983d0",
  storageBucket: "my-task-983d0.appspot.com",
  messagingSenderId: "796610329770",
  appId: "1:796610329770:web:f7240625c50719224ce4d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth, sendPasswordResetEmail };
