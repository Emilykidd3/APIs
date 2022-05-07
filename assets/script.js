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

addEventListener("click", startGame);
