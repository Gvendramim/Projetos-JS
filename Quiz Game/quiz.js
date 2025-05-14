const questions = [
  {
    question: "Qual é a capital da França?",
    answers: ["Paris", "Madrid", "Londres", "Berlim"],
    correct: 0
  },
  {
    question: "Quanto é 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    answers: ["Terra", "Júpiter", "Saturno", "Marte"],
    correct: 1
  },
  {
    question: "Quem pintou a Mona Lisa?",
    answers: ["Michelangelo", "Leonardo da Vinci", "Van Gogh", "Picasso"],
    correct: 1
  },
  {
    question: "Qual é o elemento químico representado pelo símbolo O?",
    answers: ["Ouro", "Oxigênio", "Prata", "Hidrogênio"],
    correct: 1
  },
  {
    question: "Em que continente está localizado o Brasil?",
    answers: ["Ásia", "América do Sul", "Europa", "África"],
    correct: 1
  },
  {
    question: "Quantos segundos há em um minuto?",
    answers: ["60", "100", "30", "45"],
    correct: 0
  },
  {
    question: "Qual é o animal mais rápido do mundo?",
    answers: ["Guepardo", "Leão", "Falcão-peregrino", "Antílope"],
    correct: 2
  },
  {
    question: "Qual linguagem de programação é usada comumente para criar páginas web?",
    answers: ["Python", "HTML", "C++", "Java"],
    correct: 1
  },
  {
    question: "Qual país é conhecido como Terra do Sol Nascente?",
    answers: ["China", "Japão", "Coreia do Sul", "Tailândia"],
    correct: 1
  }
];


// Sons
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');
const gameoverSound = new Audio('sounds/gameover.mp3');

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById('question');
const answersContainer = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const restartButton = document.getElementById('restart-button');
const scoreEl = document.getElementById('score');
const timeLeftEl = document.getElementById('time-left');

nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();

  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft === 0) {
      clearInterval(timer);
      disableAnswers();
      nextButton.style.display = "block";
    }
  }, 1000);
}

function updateTimer() {
  timeLeftEl.textContent = timeLeft;
}

function showQuestion() {
  resetState();

  const questionObj = questions[currentQuestionIndex];
  questionEl.textContent = questionObj.question;

  questionObj.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('btn', 'answer-btn');
    button.addEventListener('click', () => selectAnswer(index));
    answersContainer.appendChild(button);
  });

  startTimer();
}

function resetState() {
  clearInterval(timer);
  nextButton.style.display = 'none';
  answersContainer.innerHTML = '';
}

function selectAnswer(selectedIndex) {
  clearInterval(timer);

  const correctIndex = questions[currentQuestionIndex].correct;
  const buttons = document.querySelectorAll('.answer-btn');

  buttons.forEach((button, idx) => {
    button.disabled = true;
    if (idx === correctIndex) {
      button.classList.add('correct');
    }
    if (idx === selectedIndex && idx !== correctIndex) {
      button.classList.add('incorrect');
    }
  });

  if (selectedIndex === correctIndex) {
    correctSound.play();
    score++;
    scoreEl.textContent = score;
  } else {
    wrongSound.play();
  }

  nextButton.style.display = "block";
}

function disableAnswers() {
  document.querySelectorAll('.answer-btn').forEach(button => {
    button.disabled = true;
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishQuiz();
  }
}

function finishQuiz() {
  clearInterval(timer);
  gameoverSound.play();

  questionEl.innerHTML = `Quiz Finalizado!<br><br>Sua pontuação foi: <strong>${score}</strong>`;
  answersContainer.innerHTML = '';
  nextButton.style.display = "none";
  restartButton.style.display = "block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreEl.textContent = score;
  restartButton.style.display = "none";
  showQuestion();
}

document.addEventListener('DOMContentLoaded', showQuestion);
