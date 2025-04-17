// script.js
import { auth, db } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authDiv = document.getElementById("auth");
const editorDiv = document.getElementById("editor");
const postForm = document.getElementById("post-form");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const postList = document.getElementById("post-list");

onAuthStateChanged(auth, (user) => {
  if (user) {
    authDiv.classList.add("hidden");
    editorDiv.classList.remove("hidden");
    loadPosts();
  } else {
    authDiv.classList.remove("hidden");
    editorDiv.classList.add("hidden");
  }
});

function login() {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert("Erro ao logar: " + error.message));
}

function logout() {
  signOut(auth);
}

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (title && content) {
    await addDoc(collection(db, "posts"), {
      title,
      content,
      createdAt: serverTimestamp(),
    });

    titleInput.value = "";
    contentInput.value = "";
    loadPosts();
  }
});

async function loadPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  postList.innerHTML = "";
  snapshot.forEach((doc) => {
    const post = doc.data();
    const li = document.createElement("li");
    li.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    postList.appendChild(li);
  });
}

window.login = login;
window.logout = logout;
