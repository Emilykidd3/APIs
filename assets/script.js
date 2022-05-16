var startButton = document.querySelector("#start-button");
var questionEl = document.querySelector("#question");
var timer = document.querySelector("#timer");
var answerEl = document.querySelector("#answers")
var qAndAContainer = document.querySelector("#question-and-answer-container")

var timeLeft = 5;
var questions = []
console.log(questions)
var questionNum = 0;
var score = 0;

function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft === 0){
            questionNum++;
            removeOldQuestion();
            showQuestion();
            clearInterval(timeInterval);
        } else {
            timeLeft-=1
            timer.textContent=timeLeft
            console.log(timeLeft)
        }
    }, 1000)
}

function resetTime() {
    timeLeft = 5
}

function startGame(){
    countdown();
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
    // console.log("showing question")
    // console.log("question Num = " + questionNum)
    questionEl.textContent= questions[questionNum][0].question;
    for (var i = 1; i < questions[questionNum].length; i++){
        // mix buttons/ answer?
        var button = document.createElement("button");
        button.textContent = questions[questionNum][i]
        
        button.addEventListener("click", function(e){
            // console.log(e.target.innerText)
            // console.log(questions[questionNum][0].correct_answer)
            if (e.target.innerText === questions[questionNum][0].correct_answer){
                e.target.style.backgroundColor = "green"
                score++
                console.log("score = " + score)
            } else {
                e.target.style.backgroundColor = "red"
            }
            questionNum++;
            resetTime();
            var timer = setInterval(function() {
                removeOldQuestion();
                clearInterval(timer)
                return showQuestion();
            }, 1000)
        });
        answerEl.appendChild(button);
    }
}

function removeOldQuestion() {
    qAndAContainer.textContent= ""
    questionEl.textContent=""
}

startButton.addEventListener("click", startGame);
