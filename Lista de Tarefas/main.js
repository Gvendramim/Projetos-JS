const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskBtn = document.getElementById('addTaskBtn');


document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
 
  if (taskText !== '') {
    addTaskToList(taskText);
    saveTaskToLocalStorage(taskText);
    taskInput.value = ''; 
  }
});

// Adiciona tarefa à lista
function addTaskToList(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

// Adiciona funcionalidade de tarefa completa
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete');

  deleteBtn.addEventListener('click', () => {
    li.remove();
    removeTaskFromLocalStorage(taskText);
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// Salva a tarefa no Armazenamento Local
function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

 // Carrega as tarefas salvas no Local Storage quando a página é carregada e exibe as tarefas.
function loadTasks() {
  let tasks = getTasksFromLocalStorage();

  tasks.forEach(task => {
    addTaskToList(task);
  });
}

function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}
 // Remove uma tarefa do Local Storage quando ela é excluída da lista.
function removeTaskFromLocalStorage(taskToRemove) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(task => task !== taskToRemove);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
