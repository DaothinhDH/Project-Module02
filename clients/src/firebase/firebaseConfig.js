import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCu33PNGL6Ud-_5TCH2yLeE6Gq8KyrUpQg",
  authDomain: "login-with-eb4a2.firebaseapp.com",
  projectId: "login-with-eb4a2",
  storageBucket: "login-with-eb4a2.appspot.com",
  messagingSenderId: "619129818865",
  appId: "1:619129818865:web:6feb2cdf62857fcd17e350",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { storage };
