import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

let userUid = null;

// // Verifica se o usuário está logado
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     userUid = user.uid;
//     loadTickets();
//   } else {
//     window.location.href = "index.html";
//   }
// });

// Criar um novo ticket
async function createTicket() {
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!subject || !message) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    await addDoc(collection(db, "tickets"), {
      userId: userUid,
      subject,
      message,
      status: "aberto",
      createdAt: serverTimestamp()
    });

    alert("Ticket enviado!");
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
    loadTickets();
  } catch (error) {
    console.error(error);
    alert("Erro ao criar ticket.");
  }
}

// Carrega os tickets do usuário
async function loadTickets() {
  const ticketsContainer = document.getElementById("tickets");
  ticketsContainer.innerHTML = "Carregando...";

  try {
    const q = query(
      collection(db, "tickets"),
      where("userId", "==", userUid)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      ticketsContainer.innerHTML = "<p>Nenhum ticket encontrado.</p>";
      return;
    }

    let html = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      html += `
        <div class="ticket">
          <strong>${data.subject}</strong><br />
          <span class="status">Status: ${data.status}</span><br />
          <p>${data.message}</p>
        </div>
      `;
    });

    ticketsContainer.innerHTML = html;
  } catch (error) {
    console.error(error);
    ticketsContainer.innerHTML = "<p>Erro ao carregar tickets.</p>";
  }
}

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
