import { auth, db } from "../firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Verifica se é um admin 
onAuthStateChanged(auth, (user) => {
  if (user && user.email === "vendramimgabriel@gmail.com") {
    loadAllTickets();
  } else {
    alert("Acesso restrito.");
    window.location.href = "index.html";
  }
});

// Carregar todos os tickets
async function loadAllTickets() {
  const container = document.getElementById("admin-tickets");
  container.innerHTML = "Carregando...";

  const snapshot = await getDocs(collection(db, "tickets"));

  if (snapshot.empty) {
    container.innerHTML = "<p>Nenhum ticket encontrado.</p>";
    return;
  }

  let html = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    html += `
      <div class="ticket" data-id="${docSnap.id}">
        <strong>${data.subject}</strong> <br>
        <div class="status">Status: ${data.status}</div>
        <p>${data.message}</p>
        <textarea placeholder="Resposta do admin..."></textarea>
        <button onclick="responder('${docSnap.id}', this)">Responder</button>
        <button class="resolved" onclick="resolver('${docSnap.id}')">Marcar como Resolvido</button>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Enviar resposta como um novo campo
window.responder = async function (id, button) {
  const textarea = button.previousElementSibling;
  const resposta = textarea.value.trim();
  if (!resposta) {
    alert("Digite uma resposta.");
    return;
  }

  try {
    const respostaDoc = doc(db, "tickets", id);
    await updateDoc(respostaDoc, {
      adminReply: resposta,
      repliedAt: serverTimestamp()
    });
    alert("Resposta enviada!");
    textarea.value = "";
  } catch (err) {
    console.error(err);
    alert("Erro ao enviar resposta.");
  }
};

// Mudar status para resolvido
window.resolver = async function (id) {
  try {
    const ticketRef = doc(db, "tickets", id);
    await updateDoc(ticketRef, {
      status: "resolvido"
    });
    alert("Ticket marcado como resolvido!");
    loadAllTickets();
  } catch (err) {
    console.error(err);
    alert("Erro ao atualizar ticket.");
  }
};

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
};
