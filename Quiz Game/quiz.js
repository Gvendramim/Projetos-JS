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
  let timer;
  
  function startTimer() {
    timeLeft = 15;
    document.getElementById("time-left").innerText = timeLeft;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").innerText = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timer);
        document.getElementById("next-button").style.display = "block";
        disableAnswerButtons();
      }
    }, 1000);
  }
  
  function showQuestion() {
    const questionElement = document.getElementById("question");
    const answerButtons = document.querySelectorAll(".answer-btn");
    
    questionElement.innerText = questions[currentQuestionIndex].question;
    questions[currentQuestionIndex].answers.forEach((answer, index) => {
      answerButtons[index].innerText = answer;
      answerButtons[index].classList.remove("correct", "incorrect");
      answerButtons[index].disabled = false;
    });
  
    document.getElementById("next-button").style.display = "none";
    startTimer();
  }
  
  function selectAnswer(index) {
    clearInterval(timer);
  
    const isCorrect = index === questions[currentQuestionIndex].correct;
    const selectedButton = document.querySelectorAll(".answer-btn")[index];
  
    if (isCorrect) {
      selectedButton.classList.add("correct");
      score++;
      document.getElementById("score").innerText = score;
    } else {
      selectedButton.classList.add("incorrect");
      const correctIndex = questions[currentQuestionIndex].correct;
      document.querySelectorAll(".answer-btn")[correctIndex].classList.add("correct");
    }
  
    disableAnswerButtons();
    document.getElementById("next-button").style.display = "block";
  }
  
  function disableAnswerButtons() {
    document.querySelectorAll(".answer-btn").forEach(button => {
      button.disabled = true;
    });
  }
  
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endQuiz();
    }
  }
  
  function endQuiz() {
    clearInterval(timer);
    document.getElementById("question-container").innerHTML = `<h2>Quiz Finalizado!</h2><p>Seu score: ${score}</p>`;
    document.getElementById("next-button").style.display = "none";
  }
  
  // Inicializa o quiz
  showQuestion();
  