let js = [{
        question: "Commonly used data types DO NOT include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        question: "Which of the following is correct about features of JavaScript?",
        answers: ["JavaScript is a lightweight, interpreted programming language.",
            "JavaScript is designed for creating network-centric applications.",
            "JavaScript is complementary to and integrated with Java.",
            "All of the above."
        ],
        answer: "All of the above"
    },

    {
        question: " Which of the following is true about cookie handling in JavaScript?",
        answers: ["JavaScript can manipulate cookies using the cookie property of the Document object.",
            "JavaScript can read, create, modify, and delete the cookie or cookies that apply to the current web page.",
            "Both of the above.",
            "None of the above"
        ],
        answer: "Both of the above."
    },

    {
        question: "Which of the following type of variable takes precedence over other if names are same?",
        answers: ["global variable", "local variable", "Both of the above", "None of the above."],
        answer: "local variable"
    },

    {
        question: "Which built-in method returns the calling string value converted to upper case?",
        answers: ["toUpperCase()", "toUpper()", "changeCase(case)", "None of the above."],
        answer: "toUpperCase()"

    }
]

let ol = [{
        question: "Which athlete has won the most Olympic medals?",

        answers: ["Carl Lewis", "Mark Spitz", "Michael Phelps", "Larisa Latynina"],
        answer: "Michael Phelps"
    },

    {
        question: "Why did Bobby Pearce slow down during his rowing race at the 1928 Olympics in Amsterdam?",
        answers: ["To wave to a fellow competitor's wife in the crowd",
            "To let a family of ducks pass by in the water",
            "As he dropped his oar into the water",
            "His glasses fell off and he needed to find them in the boat"
        ],
        answer: "To let a family of ducks pass by in the water"
    },

    {
        question: "Which metal makes up 92.5% of an Olympic gold medal?",
        answers: ["Gold", "Silver", "Bronze","Copper"],
        answer: "Silver"
    },

    {
        question: "Which of these countries has not hosted the summer Olympics?",
        answers: ["Finland", "Mexico", "India", "Belgium"],
        answer: "India"
    },

    {
        question: "Hans-Gunnar Liljenwall was the first Olympic athlete to be suspended for drug use. Which banned substance had he consumed?",
        answers: ["Cocaine", "Alcohol", "Marijuana","Paracetamol"],
        answer: "Alcohol"
    }
]

let qNum = 0;
let qContainer = document.getElementById("quizZone");

var timeleft = 75;
var downloadTimer;
var scores = [];

function changeTime() {
    timeleft = timeleft - 10;
}

let qType;

//When user clicks quiz type button 
function startQuiz(type) {
    qType = type;
    showDeck(0);
    timeleft = 75;
    document.getElementById('result').innerText = '';

    downloadTimer = setInterval(function () {
            document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
            timeleft -= 1;
            if (timeleft <= 0) {
                clearInterval(downloadTimer);
                document.getElementById("timer").innerHTML = "Finished"

                document.getElementById('quizZone').innerHTML = "Your allocated time has expired. Thanks for atempting the quiz, please try again!";
            }
        },
        1000);
}

//To display question
function showDeck(num) {
    const qust = qType === 'js' ? js[num] : ol[num];
    const output = [];
    const answers = [];
    question = `<div id="question">${qust.question}</div>`;
    qust.answers.forEach(setButton);
    qContainer = document.getElementById("quizZone");

    function setButton(ans) {
        answers.push(`<button class="btn btn-info" name="question${num}" value="${ans}" onclick="showNextQuestion('${ans}')">${ans}</button>`)
    }

    output.push(
        `<div id="question"> ${qust.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
    );
    qContainer.innerHTML = output.join("");
}

/* When user selects an answer 
   - Check answer and show info to user (correct or wrong)
   - if it's end of quiz then go to finish
*/
function showNextQuestion(ans) {
    const result = [];

    //if (js[qNum].answer === ans) {
    if(ans === (qType === 'js' ? js[qNum].answer : ol[qNum].answer)) {   
        result.push('<span id="correct">Correct!</span>');
    } else {
        result.push('<span id="wrong">Wrong!</span>');
        timeleft = timeleft - 10;
    }
    document.getElementById('result').innerHTML = result.join("");
    console.log(qNum);
    if (qNum === (qType === 'js' ? (js.length - 1) : (ol.length - 1))) {
        clearInterval(downloadTimer);
        showFinish(timeleft);
        return;
    } else {
        qNum = qNum + 1;
        showDeck(qNum);
    }
}

//To display text box and get user initial 
function showFinish(time) {
    const output = [];
    //document.getElementById('result').innerText = '';
    document.getElementById("timer").innerHTML = time + " seconds remaining";
    output.push(
        `<div id='finish'>
                <h3>All Done!</h3> 
                <div class = "answers"> Your scroe is ${time} </div>
                Enter initials: <input id="yourscr" type="text" name="Enter your name">
                <button class = "btn btn-success"
                name = "score"
                value = "score"
                onclick = "storeScore(${time})"> Submit </button>
        </div>`
    );
    qNum = 0;
    timeleft = 0;

    qContainer.innerHTML = output.join("");
}

//To store score in local storage
function storeScore(score) {
    //scores = document.localStorage.getItem("scores");
    scores.push((document.getElementById("yourscr").value) + " : " + score);
    localStorage.setItem("scores", scores);
    
    document.getElementById('result').innerText = '';
    document.getElementById("timer").innerHTML = "";
    document.getElementById("scores").classList.remove('hide');
    document.getElementById("scores").classList.add('show');
    
    showScores();
}

//To display local storage score
function showScores() {
    setScore(localStorage.getItem("scores").split(","));

    function setScore(scrs) {
        scrList = [];
        for (scr in scrs) {
            scrList.push(`<div id="scrs">${scrs[scr]}</div>`);
        }
    }
    document.getElementById('quizZone').innerHTML = "Scores<br>" + scrList.join("") + "<br> Thanks for atempting the quiz! <br>" +
        "<button class='btn btn-warning' style='margin-right: 165px;' onclick='resetQuiz()'>Go Back</button>" +
        "<button class='btn btn-danger' onclick='clearStorage()'>Clear Scores</button>";
}

//To clear local storage (scores) and hide score link
function clearStorage() {
    localStorage.removeItem("scores");
    scores = [];
    document.getElementById("scores").classList.remove('show');
    document.getElementById("scores").classList.add('hide');
    
}

//On page load check if we have to show/hide score link
function checkScore() {
    console.log('localStorage.getItem("scores")=' + localStorage.getItem("scores"));
    if(localStorage.getItem("scores") != null) {
        document.getElementById("scores").classList.remove('hide');
        document.getElementById("scores").classList.add('show');
    } else {
        document.getElementById("scores").classList.remove('show');
        document.getElementById("scores").classList.add('hide');
    }
}

function resetQuiz() {
    window.location.reload();
}