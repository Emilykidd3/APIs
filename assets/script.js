var startButton = document.querySelector("#start-button")

var timeLeft = 4;

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
}

function hideStartScreen() {
    startButton.classList.add("hide")
}

function getQuestions() {
    fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
    .then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.results[0])
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}
getQuestions();

addEventListener("click", startGame);
