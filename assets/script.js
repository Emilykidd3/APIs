var timeLeft = 4;

function countdown() {
    if (timeLeft > 0){
        timeLeft--
    }
    clearInterval(timeLeft);
    console.log(timeLeft)
}

setInterval(countdown, 1000);
