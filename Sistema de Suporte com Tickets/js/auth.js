import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

let isLogin = true;

const btnSubmit = document.getElementById("btn-submit");
const toggleFormBtn = document.getElementById("toggle-form");

btnSubmit.addEventListener("click", handleSubmit);
toggleFormBtn.addEventListener("click", toggleForm);

async function handleSubmit() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!email || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    if (isLogin) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        alert("Usuário sem dados no banco.");
        return;
      }

      const userRole = userDoc.data().role;

      if (userRole === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "dashboard.html";
      }
    } else {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        role
      });

      alert("Conta criada com sucesso! Faça login.");
      toggleForm();
    }
  } catch (error) {
    alert("Erro: " + error.message);
  }
}

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Registro";
  btnSubmit.innerText = isLogin ? "Entrar" : "Registrar";
  toggleFormBtn.innerText = isLogin ? "Criar uma conta" : "Já tenho uma conta";

  document.getElementById("role").style.display = isLogin ? "none" : "block";
}
