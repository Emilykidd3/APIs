var startButton = document.querySelector("#start-button");
var questionEl = document.querySelector("#question");
var timer = document.querySelector("#timer");
var answerEl = document.querySelector("#answers")

var timeLeft = 4;
var questions = []
var questionNum = 0;

function countdown() {
    if (timeLeft > 0){
        timeLeft--
        timer.textContent=timeLeft
    }
    clearInterval(timeLeft);
    // console.log(timeLeft)
}

function startGame(){
    setInterval(countdown, 1000);
    hideStartScreen();
    showQuestion();
    // console.log(questions)
}

function hideStartScreen() {
    startButton.classList.add("hide")
}

function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                for (var i = 0; i < data.results.length; i++) {
                    questions.push(data.results[i])
                }
                console.log(data.results[0].correct_answer)
                for (var i = 0; i < data.results[0].incorrect_answers.length; i++){
                    console.log(data.results[0].incorrect_answers[i])
                }
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}
getQuestions();

function showQuestion() {
    questionEl.textContent= questions[questionNum].question;
}

startButton.addEventListener("click", startGame);
