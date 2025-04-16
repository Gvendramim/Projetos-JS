const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const columns = document.querySelectorAll(".task-list");

// Carregar tarefas salvas
document.addEventListener("DOMContentLoaded", loadTasks);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    createTask(input.value, "todo");
    input.value = "";
  }
});

// Criar tarefa
function createTask(text, status) {
  const li = document.createElement("li");
  li.className = "task";
  li.textContent = text;
  li.draggable = true;

  const btn = document.createElement("button");
  btn.textContent = "✕";
  btn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(btn);
  addDragEvents(li);
  document.getElementById(`${status}-list`).appendChild(li);

  anime({
    targets: li,
    opacity: [0, 1],
    translateY: [-10, 0],
    duration: 500,
    easing: "easeOutQuad",
  });

  saveTasks();
}

function addDragEvents(task) {
  task.addEventListener("dragstart", () => {
    task.classList.add("dragging");
  });

  task.addEventListener("dragend", () => {
    task.classList.remove("dragging");
    saveTasks();
  });
}

columns.forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector(".dragging");
    if (dragging && list !== dragging.parentNode) {
      list.appendChild(dragging);
    }
  });
});

function saveTasks() {
  const data = {};
  columns.forEach((col) => {
    data[col.id] = [];
    col.querySelectorAll(".task").forEach((task) => {
      data[col.id].push(task.firstChild.textContent);
    });
  });

  fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(err => console.error("Erro ao salvar:", err));
}

function loadTasks() {
  fetch("/load")
    .then(res => res.json())
    .then(data => {
      for (const key in data) {
        data[key].forEach((text) => {
          const status = key.replace("-list", "");
          createTask(text, status);
        });
      }
    })
    .catch(() => console.log("Sem dados anteriores"));
}