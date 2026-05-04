let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const quizCard = document.getElementById("quiz-card");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");

async function loadQuestions() {
  const response = await fetch("questions.json");
  questions = await response.json();
  startGame();
}

function startGame() {
  questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  answered = false;

  resultElement.classList.add("hidden");
  quizCard.classList.remove("hidden");

  showQuestion();
}

function showQuestion() {
  answered = false;
  feedbackElement.textContent = "";
  nextButton.style.display = "none";

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  answersElement.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => selectAnswer(button, index);
    answersElement.appendChild(button);
  });
}

function selectAnswer(button, selectedIndex) {
  if (answered) return;

  answered = true;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedIndex === currentQuestion.correct) {
    score++;
    button.classList.add("correct");
    feedbackElement.textContent = "Correct!";
  } else {
    button.classList.add("wrong");
    feedbackElement.textContent =
      `Incorrect. The correct answer is: ${currentQuestion.answers[currentQuestion.correct]}`;
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizCard.classList.add("hidden");
  resultElement.classList.remove("hidden");
  progressElement.textContent = "";
  scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;
}

loadQuestions();