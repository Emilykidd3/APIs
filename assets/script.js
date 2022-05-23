var startButton = document.querySelector("#start-button");
var questionEl = document.querySelector("#question");
var timer = document.querySelector("#timer");
var answerEl = document.querySelector("#answers");
var qAndAContainer = document.querySelector("#question-and-answer-container");

var timeLeft = 20;
var questions = [];
var questionNum = 0;
var score = 0;

function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft === 0 && questionNum < 10) {
      questionNum++;
      removeOldQuestion();
      showQuestion();
      resetTime();
    } else if (questionNum === 10){
        timer.textContent = `Your score is ${score}/10`;
      } else {
      timeLeft -= 1;
      timer.textContent = timeLeft;
    }
  }, 1000);
}

function resetTime() {
  timeLeft = 20;
}

function startGame() {
  countdown();
  hideStartScreen();
  showQuestion();
}

function hideStartScreen() {
  startButton.classList.add("hide");
}

function getQuestions() {
  fetch(
    "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy"
  ).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        for (var i = 0; i < data.results.length; i++) {
          var questionArr = [];
          questionArr.push(data.results[i]);
          questionArr.push(data.results[i].correct_answer);
          for (var j = 0; j < data.results[i].incorrect_answers.length; j++) {
            questionArr.push(data.results[i].incorrect_answers[j]);
          }
          questions.push(questionArr);
        }
      });
    } else {
      console.error("Error: " + response.statusText);
    }
  });
}
getQuestions();

function showQuestion() {
  if (questionNum === 10) {
    timer.textContent = `Your score is ${score}/10`;
  } else {
    questionEl.textContent = questions[questionNum][0].question;
    // shuffle arr
    var arr = questions[questionNum].slice(1);
    arr = shuffleAnswers(arr);
    console.log("thisis the array!! = " + arr)
    for (var i = 0; i < questions[questionNum].length-1; i++) {
      var button = document.createElement("button");
    //   button.textContent = questions[questionNum][i];
        button.textContent = arr[i];

      button.addEventListener("click", function (e) {
        if (e.target.innerText === questions[questionNum][0].correct_answer) {
          e.target.style.backgroundColor = "green";
          score++;
        } else {
          e.target.style.backgroundColor = "red";
        }
        questionNum++;
        resetTime();
        var timer = setInterval(function () {
          removeOldQuestion();
          clearInterval(timer);
          showQuestion();
          return;
        }, 1000);
    });
      answerEl.appendChild(button);
    }
  }
}

function removeOldQuestion() {
  questionEl.textContent = "";
  answerEl.textContent = "";
}

function shuffleAnswers(arr){
    if (arr.length === 4){
        // shuffle answers
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr
    } else if (arr.length === 2) {
        // set true or false questions to true always being first
        return [true, false];
    }
}

startButton.addEventListener("click", startGame);
