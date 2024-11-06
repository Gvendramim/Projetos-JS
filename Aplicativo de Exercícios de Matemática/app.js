let score = 0;
let currentAnswer;
let level = 'easy';

function generateQuestion() {
  const difficulty = document.getElementById('difficulty').value;
  level = difficulty;
  const min = level === 'easy' ? 1 : level === 'medium' ? 10 : 20;
  const max = level === 'easy' ? 10 : level === 'medium' ? 20 : 50;

  const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
  const num2 = Math.floor(Math.random() * (max - min + 1)) + min;

  const operation = getRandomOperation();

  const questionElement = document.getElementById('question');
  questionElement.innerText = `${num1} ${operation} ${num2} = ?`;

  if (operation === '+') {
    currentAnswer = num1 + num2;
  } else if (operation === '-') {
    currentAnswer = num1 - num2;
  } else if (operation === '*') {
    currentAnswer = num1 * num2;
  } else if (operation === '/') {
    currentAnswer = num1 / num2;
    currentAnswer = parseFloat(currentAnswer.toFixed(2)); 
  }

  document.getElementById('feedback').innerText = '';
  document.getElementById('answer').value = '';
  document.getElementById('next-btn').style.display = 'none';
  document.getElementById('submit-btn').disabled = false;
}

function getRandomOperation() {
  const operations = ['+', '-', '*', '/'];
  const randomIndex = Math.floor(Math.random() * operations.length);
  return operations[randomIndex];
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById('answer').value);
  const feedbackElement = document.getElementById('feedback');

  if (userAnswer === currentAnswer) {
    score++;
    feedbackElement.innerText = 'Resposta Correta!';
    feedbackElement.style.color = 'green';
  } else {
    feedbackElement.innerText = `Resposta Errada.    
    A resposta correta era ${currentAnswer}.`;
    feedbackElement.style.color = 'red';
  }

  document.getElementById('score').innerText = score;
  document.getElementById('submit-btn').disabled = true;
  document.getElementById('next-btn').style.display = 'block'; 
}

function nextQuestion() {
  generateQuestion(); 
}

generateQuestion(); 
