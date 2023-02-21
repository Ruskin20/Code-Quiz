// Basic variables

var ContainerForQuestions = document.getElementById("Questions-container");
var frontPageContainer = document.getElementById("front-page-container");
var EndContainer = document.getElementById("container-at-end")

var containerForInitialsForm = document.getElementById("initials-form")

var ScoreContainer = document.getElementById("score-banner")
var HighScoreContainer = document.getElementById("high-score-container")
var ViewHighScoreContainer = document.getElementById("View-scores")
var ListForHighScore = document.getElementById("List-for-score")


// Timer and question/answers variables
var ElForTimer = document.querySelector("#timer");
var score = 0;
var TimeLeft;
var GameOver
ElForTimer.innerText = 0;

var CorrectAnsEL = document.getElementById("correct")
var WrongAnsEL = document.getElementById("wrong")

var ELForAnswerBtn = document.getElementById("Answer-Btn")
var QuestionElement = document.getElementById("question")



// Variables for buttons
var StartGameBtn = document.querySelector("#Start-Game");
var BackBtnEL = document.querySelector("#Back-Btn")
var ClearScoreBtn = document.querySelector("#Clean-Scores")



//High Score variable
var HighScores = [];



//assign array details for questions 
var ArrayForShuffleQuestions
var QuestionIndex = 0



// Array of questions
var questions = [
    {
        prompt: 'When did Javascript first  appear?',
        correctAnsw: '1995',
        choices: [{ choice: '2006' }, { choice: '1992' }, { choice: '2001' }, { choice: '1995' }]
    },
    {
        prompt: 'What syntax would call a function?',
        correctAnsw: 'Function()',
        choices: [{ choice: 'Var Function' }, { choice: 'Function()' }, { choice: 'Function' }, { choice: 'Call function' }]
    },
    {
        prompt: 'The condition in an if / else statement is enclosed with ______.',
        correctAnsw: 'Curly Brackets',
        choices: [{ choice: 'Square Brackets' }, { choice: 'Curly Brackets' }, { choice: 'Parenthesis' }, { choice: 'Quotes' }]
    },
    {
        prompt: 'Arrays in JavaScript can be used to store ______.',
        correctAnsw: 'Booleans',
        choices: [{ choice: 'Booleans' }, { choice: 'Numbers and Strings' }, { choice: 'Other Arrays' }, { choice: 'All of the above' }]
    },

    {
        prompt: 'What does DOM stand for?',
        correctAnsw: 'Document Object Model',
        choices: [{ choice: 'Do Overnight Modules' }, { choice: 'Document Object Model' }, { choice: 'Divas Obviously Model' }, { choice: 'Do Only Margins' }]
    },
];



// Function to start game 
var startGame = function () {
    //add classes to show/hide start and quiz screen
    frontPageContainer.classList.add('hide');
    frontPageContainer.classList.remove('show');
    ContainerForQuestions.classList.remove('hide');
    ContainerForQuestions.classList.add('show');
    //Shuffler so we get different order of questions
    ArrayForShuffleQuestions = questions.sort(() => Math.random() - 0.5)
    setTimer()
    SetQuestion()
}



//Timer for game. it starts at 60 secs and it shows score when it reaches 0 secs
var setTimer = function () {
    TimeLeft = 60;

    var CheckTimer = setInterval(function () {
        ElForTimer.innerText = TimeLeft;
        TimeLeft--

        if (GameOver) {
            clearInterval(CheckTimer)
        }

        if (TimeLeft < 0) {
            ShowScore()
            ElForTimer.innerText = 0
            clearInterval(CheckTimer)
        }

    }, 1000)
}

//Display Questions and answers
var displayQuestion = function (index) {
    QuestionElement.innerText = index.prompt
    for (var i = 0; i < index.choices.length; i++) {
        var answerbutton = document.createElement('button')
        answerbutton.innerText = index.choices[i].choice
        answerbutton.classList.add('btn')
        answerbutton.classList.add('answerbtn')
        answerbutton.addEventListener("click", CheckAnswer)
        ELForAnswerBtn.appendChild(answerbutton)
    }
};
//if go back button is hit on high score page
var ShowFrontPage = function () {
    HighScoreContainer.classList.add("hide")
    HighScoreContainer.classList.remove("show")
    frontPageContainer.classList.remove("hide")
    frontPageContainer.classList.add("show")
    ScoreContainer.removeChild(ScoreContainer.lastChild)
    QuestionIndex = 0
    GameOver = ""
    ElForTimer.textContent = 0
    score = 0

    if (CorrectAnsEL.className = "show") {
        CorrectAnsEL.classList.remove("show");
        CorrectAnsEL.classList.add("hide")
    }
    if (WrongAnsEL.className = "show") {
        WrongAnsEL.classList.remove("show");
        WrongAnsEL.classList.add("hide");
    }
}
//Move on to next question
var SetQuestion = function () {
    resetAnswers()
    displayQuestion(ArrayForShuffleQuestions[QuestionIndex])
}

//Remove answers
var resetAnswers = function () {
    while (ELForAnswerBtn.firstChild) {
        ELForAnswerBtn.removeChild(ELForAnswerBtn.firstChild)
    };
};


//Correct text when correct choice is picked
var CorrectText = function () {
    if (CorrectAnsEL.className = "hide") {
        CorrectAnsEL.classList.remove("hide")
        CorrectAnsEL.classList.add("show")
        WrongAnsEL.classList.remove("show")
        WrongAnsEL.classList.add("hide")
    }
}
//Wrong text when wrong choice is picked
var WrongText = function () {
    if (WrongAnsEL.className = "hide") {
        WrongAnsEL.classList.remove("hide")
        WrongAnsEL.classList.add("show")
        CorrectAnsEL.classList.remove("show")
        CorrectAnsEL.classList.add("hide")
    }
}

//Checks for correct answer. Penalizes of wrong answer is picked and takes away time
var CheckAnswer = function (event) {
    var SelectedAnswer = event.target
    if (ArrayForShuffleQuestions[QuestionIndex].correctAnsw === SelectedAnswer.innerText) {
        CorrectText()
        score = score + 25
    }

    else {
        WrongText()
        score = score - 25;
        TimeLeft = TimeLeft - 10;
    };

    //Checks for questions available and moves on to next one
    QuestionIndex++
    if (ArrayForShuffleQuestions.length > QuestionIndex + 0) {
        SetQuestion()
    }
    else {
        GameOver = "true";
        ShowScore();
    }
}

//Display total score screen at end of game
var ShowScore = function () {
    ContainerForQuestions.classList.add("hide");
    EndContainer.classList.remove("hide");
    EndContainer.classList.add("show");

    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    ScoreContainer.appendChild(scoreDisplay);
}

//create high score values
var createHighScore = function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("You must enter your initials!");
        return;
    }

    containerForInitialsForm.reset();

    var HighScore = {
        initials: initials,
        score: score
    }

    //push and sort scores
    HighScores.push(HighScore);
    HighScores.sort((a, b) => { return b.score - a.score });

    //clear visibile list to resort
    while (ListForHighScore.firstChild) {
        ListForHighScore.removeChild(ListForHighScore.firstChild)
    }
    //create elements in order of high scores
    for (var i = 0; i < HighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        ListForHighScore.appendChild(highscoreEl);
    }

    saveHighScore();
    DisplayHighScores();
}
//Save Score
var saveHighScore = function () {
    localStorage.setItem("HighScores", JSON.stringify(HighScores))

}

//Load Scores

var loadHighScore = function () {
    var LoadedHighScores = localStorage.getItem("HighScores")
    if (!LoadedHighScores) {
        return false;
    }

    LoadedHighScores = JSON.parse(LoadedHighScores);
    LoadedHighScores.sort((a, b) => { return b.score - a.score })


    for (var i = 0; i < LoadedHighScores.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.ClassName = "high-score";
        highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
        ListForHighScore.appendChild(highscoreEl);

        HighScores.push(LoadedHighScores[i]);

    }
}
loadHighScore()
//Display Score when initial are entered
var DisplayHighScores = function () {

    HighScoreContainer.classList.remove("hide");
    HighScoreContainer.classList.add("show");
    GameOver = "true"

    if (EndContainer.className = "show") {
        EndContainer.classList.remove("show");
        EndContainer.classList.add("hide");
    }
    if (frontPageContainer.className = "show") {
        frontPageContainer.classList.remove("show");
        frontPageContainer.classList.add("hide");
    }

    if (ContainerForQuestions.className = "show") {
        ContainerForQuestions.classList.remove("show");
        ContainerForQuestions.classList.add("hide");
    }

    if (CorrectAnsEL.className = "show") {
        CorrectAnsEL.classList.remove("show");
        CorrectAnsEL.classList.add("hide");
    }

    if (WrongAnsEL.className = "show") {
        WrongAnsEL.classList.remove("show");
        WrongAnsEL.classList.add("hide");
    }

}
//Clean Scores
var clearScores = function () {
    HighScores = [];

    while (ListForHighScore.firstChild) {
        ListForHighScore.removeChild(ListForHighScore.firstChild);
    }

    localStorage.clear(HighScores);

}

//Event Listener to start game
StartGameBtn.addEventListener("click", startGame)
//Submit event Listener
containerForInitialsForm.addEventListener("submit", createHighScore)
//On click, show scores
ViewHighScoreContainer.addEventListener("click", DisplayHighScores)
//Go back button
BackBtnEL.addEventListener("click", ShowFrontPage)
//Event listener to clear scores
ClearScoreBtn.addEventListener("click", clearScores)
