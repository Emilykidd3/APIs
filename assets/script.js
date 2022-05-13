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
}

function startGame(){
    setInterval(countdown, 1000);
    hideStartScreen();
    showQuestion();
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
                    var questionArr = [];
                    questionArr.push(data.results[i])
                    questionArr.push(data.results[i].correct_answer)
                    for (var j = 0; j < data.results[i].incorrect_answers.length; j++){
                        questionArr.push(data.results[i].incorrect_answers[j])
                    }
                    questions.push(questionArr);
                }
            });
        } else {
            console.error("Error: "+response.statusText);
        }
    })
}
getQuestions();

function showQuestion() {
    questionEl.textContent= questions[questionNum][0].question;
    for (var i = 1; i < questions[questionNum].length; i++){
        // mix buttons/ answer?
        var button = document.createElement("button");
        button.textContent = questions[questionNum][i]
        answerEl.appendChild(button)

    }
    answerEl.addEventListener("click", function(e){
        console.log(e.target.innerText)
        console.log(questions[questionNum][0].correct_answer)
        if (e.target.innerText === questions[questionNum][0].correct_answer){
            console.log("correct!!")
        } else {
            console.log("incorrect:(")
        }
        // compare answer to correct answer
    })
}

startButton.addEventListener("click", startGame);
