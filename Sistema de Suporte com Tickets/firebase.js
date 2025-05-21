import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJVmDqVEsl4G-P68K9P-6DUjcPRmi3Tns",
  authDomain: "suporte-6d00e.firebaseapp.com",
  projectId: "suporte-6d00e",
  storageBucket: "suporte-6d00e.appspot.com",
  messagingSenderId: "926268881330",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
