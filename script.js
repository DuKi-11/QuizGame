const startScreen=document.getElementById('startScreen')
const startP=document.getElementById('startP')
const startBtn=document.getElementById('startBtn')
const questions=document.getElementById('questions')
const currentQuestion=document.getElementById('currentQuestion')
const currentScore=document.getElementById('currentScore')
const answerContainer=document.getElementById('answerContainer')
const progressBar=document.getElementById('progressBar')
const resultP=document.getElementById("resultP")
const finalScore=document.getElementById('finalScore')
const restartBtn=document.getElementById('restartBtn')
const maxQuestion=document.getElementById('maxQuestion')
const maxScore=document.getElementById('maxScore')
const questionScreen=document.getElementById('questionScreen')
const resultScreen=document.getElementById('resultScreen')

const quizQuestions=[
    {question: "What is the capital of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Madrid", correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ],
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Arctic Ocean", correct: false },
                { text: "Pacific Ocean", correct: true },
            ],
        },
        {
            question: "Which of these is NOT a programming language?",
            answers: [
                { text: "Java", correct: false },
                { text: "Python", correct: false },
                { text: "Banana", correct: true },
                { text: "JavaScript", correct: false },
            ],
        },
        {
                question: "What is the chemical symbol for gold?",
                answers: [
                { text: "Go", correct: false },
                { text: "Gd", correct: false },
                { text: "Au", correct: true },
                { text: "Ag", correct: false },
                ],
        },

]

let currentQuestionIndex=0;
let score=0 ;
let answerDisabled=false;

maxQuestion.textContent=quizQuestions.length;
maxScore.textContent=quizQuestions.length;

//event listeners

startBtn.addEventListener("click",startQuiz);
restartBtn.addEventListener("click",restartScreen);
//For StartQuiz function it make move startQuiz
function startQuiz(){   
    //rest vars
    currentQuestionIndex=0;
    score=0;
    currentScore.textContent=0;

    startScreen.classList.remove("active");
    questionScreen.classList.add("active");
    showQuestion();
}
function showQuestion(){
    answerDisabled=false;/////This one work when user click the wrong answer and do the stop clicking
    const currentQuiz=quizQuestions[currentQuestionIndex];
    currentQuestion.textContent=currentQuestionIndex+1;

    const progressPercent=(currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";
    progressBar.style.backgroundColor = "#3b82f6";

    questions.textContent=currentQuiz.question;

    answerContainer.innerHTML="";

    currentQuiz.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer-btn")


        ///in this here we created dataset!!!!///

        button.dataset.correct=answer.correct;
        button.addEventListener('click',selectAnswer);
        answerContainer.appendChild(button);
    });
}

function selectAnswer(event){
    // optimization check
    if (answerDisabled)return;
    answerDisabled=true;

    const selectButton=event.target;
    const isCorrect=selectButton.dataset.correct==="true"

    //in here we create array 

    Array.from(answerContainer.children).forEach((button)=>{
if (button.dataset.correct==="true"){
    button.classList.add("correct");
    }
    else if (button===selectButton){
        button.classList.add("incorrect");
    }
    });

    if(isCorrect){
        score++;
        currentScore.textContent= score;
    }
    setTimeout(() => {
        currentQuestionIndex++;
        // in here we check question and if the quiz is over 
        if(currentQuestionIndex<quizQuestions.length){
            showQuestion();
        }else{
            showResults();
        } 
    },1000);
}
function showResults(){
    questionScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScore.textContent=score;

    const percentage=(score/quizQuestions.length)*100;

    if (percentage==100){
        resultP.textContent ="Perfect! You are a genius"
    }else if (percentage>=80){
        resultP.textContent="Great Job!You know your stuff"
    }else if(percentage>=60){
        resultP.textContent ="Good Effort!!Keep working"
    }else if (percentage>=40){
        resultP.textContent="Keep Studying!!You'll get better"
    }
}

function restartScreen(){
    resultScreen.classList.remove("active");
    startScreen.classList.add("active")
    startQuiz();
}