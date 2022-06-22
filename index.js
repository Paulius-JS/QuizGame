// https://opentdb.com/api_config.php

// https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=boolean

const startBtn = document.querySelector("#start");
const gameSetupWindow = document.querySelector(".gameWindowSetup");
const gameDisplay = document.querySelector(".game");
const displayQuestion = document.querySelector("#question");
const trueBtn = document.querySelector("#AnswerTrue");
const falseBtn = document.querySelector("#AnswerFalse");
const displayScore = document.querySelector("#score");
const currentQuestion = document.querySelector("#currentQuestion");
const totalQuestions = document.querySelector("#totalQuestions");
const gameRestart = document.querySelector(".gameRestart");
const finalScore = document.querySelector(".finalScore");
const backToMeniu = document.querySelector("#backToMeniu");
const questionLength = document.querySelector("#questionLength");
const difficulty = document.querySelector("#difficulty");
const category = document.querySelector("#category");
const loading = document.querySelector(".testLoad");

let score = 0;
let currentQuestionIndex = 0;
let questions = [];

async function fetchQuestion() {
  try {
    gameSetupWindow.classList.add("hidden");
    loading.classList.remove("hidden");
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${questionLength.value}&category=${category.value}&difficulty=${difficulty.value}&type=boolean`
    );
    const result = await response.json();
    loading.classList.add("hidden");
    gameDisplay.classList.remove("hidden");

    const formatedQuestions = FormatQuestions(result.results);
    startGame(formatedQuestions);
  } catch (err) {
    console.log(err);
  }
}
function FormatQuestions(questions) {
  return questions.map((question) => {
    return {
      question: question.question,
      isTrue: question.correct_answer === "True",
    };
  });
}
function startGame(FormatQuestions) {
  questions = [...FormatQuestions];
  displayQuestion.innerHTML = questions[currentQuestionIndex].question;
}
startBtn.addEventListener("click", () => {
  fetchQuestion();
});
function handleAnswer(isCorrect) {
  if (isCorrect) {
    score++;
  }
  currentQuestionIndex++;
  displayQuestion.innerHTML = questions[currentQuestionIndex].question;
  displayScore.innerHTML = `Score:` + score;
  currentQuestion.innerHTML = ` Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;
}
trueBtn.addEventListener("click", () =>
  answerEvent(questions[currentQuestionIndex].isTrue)
);
falseBtn.addEventListener("click", () =>
  answerEvent(!questions[currentQuestionIndex].isTrue)
);
function answerEvent(answer) {
  if (questions.length === currentQuestionIndex + 1) {
    gameDisplay.classList.add("hidden");
    gameRestart.classList.remove("hidden");
    finalScore.innerHTML = `Good job your final score is:` + score;
    return;
  }
  handleAnswer(answer);
}
backToMeniu.addEventListener("click", () => {
  location.reload();
});
