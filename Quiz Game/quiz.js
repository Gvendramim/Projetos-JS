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
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer = null;

function startTimer() {
  timeLeft = 15;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft === 0) {
      clearInterval(timer);
      showNextButton();
      disableAnswers();
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById("time-left").textContent = timeLeft;
}

function showQuestion() {
  const questionObj = questions[currentQuestionIndex];
  const questionElement = document.getElementById("question");
  const answerButtons = document.querySelectorAll(".answer-btn");

  questionElement.textContent = questionObj.question;
  answerButtons.forEach((btn, index) => {
    btn.textContent = questionObj.answers[index];
    btn.className = "btn answer-btn";
    btn.disabled = false;
  });

  hideNextButton();
  startTimer();
}

function selectAnswer(index) {
  clearInterval(timer);

  const isCorrect = index === questions[currentQuestionIndex].correct;
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (idx === questions[currentQuestionIndex].correct) {
      btn.classList.add("correct");
    } else if (idx === index) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    document.getElementById("score").textContent = score;
  }

  showNextButton();
}

function disableAnswers() {
  document.querySelectorAll(".answer-btn").forEach(button => {
    button.disabled = true;
  });
}

function showNextButton() {
  document.getElementById("next-button").style.display = "block";
}

function hideNextButton() {
  document.getElementById("next-button").style.display = "none";
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

  const container = document.getElementById("question-container");
  container.innerHTML = `
    <h2>Quiz Finalizado!</h2>
    <p>Sua pontuação final foi: <strong>${score}</strong></p>
  `;

  document.getElementById("next-button").style.display = "none";
  document.getElementById("restart-button").style.display = "block";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score").textContent = score;

  document.getElementById("question-container").innerHTML = `
    <p id="question" class="question-text"></p>
    <div id="answer-buttons" class="btn-container">
      <button class="btn answer-btn" onclick="selectAnswer(0)"></button>
      <button class="btn answer-btn" onclick="selectAnswer(1)"></button>
      <button class="btn answer-btn" onclick="selectAnswer(2)"></button>
      <button class="btn answer-btn" onclick="selectAnswer(3)"></button>
    </div>
  `;

  document.getElementById("restart-button").style.display = "none";
  document.getElementById("next-button").style.display = "none";

  showQuestion();
}

document.addEventListener("DOMContentLoaded", showQuestion);
