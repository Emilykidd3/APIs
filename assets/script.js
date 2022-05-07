var startButton = document.querySelector("#start-button")

var timeLeft = 4;
var questions = []

function countdown() {
    if (timeLeft > 0){
        timeLeft--
    }
    clearInterval(timeLeft);
    console.log(timeLeft)
}

function startGame(){
    setInterval(countdown, 1000);
    hideStartScreen();
    console.log(questions)
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
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}
getQuestions();

addEventListener("click", startGame);
