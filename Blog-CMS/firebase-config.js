import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBYqThiTB0RNbymz2owixltwS9Nr-uipQE",
  authDomain: "blog-cms-60782.firebaseapp.com",
  projectId: "blog-cms-60782",
  storageBucket: "blog-cms-60782.firebasestorage.app",
  messagingSenderId: "927265272401",
  appId: "1:927265272401:web:64db1987aaaa5211227e70"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
