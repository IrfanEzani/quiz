const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const game = document.getElementById('game')
const loader = document.getElementById("loader");
const play = document.getElementById('play')
const home = document.getElementById('home')



let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
  .then(res => {
    return res.json();
    console.log(res);
  })
  .then(datas => {
  questions = datas.results.map(data => {
        const format_question = {
        question: he.decode(data.question),
        answer: Math.floor(Math.random() * 3)  + 1
      }
      const answerChoices = [...data.incorrect_answers] //get only incorrect answers
      answerChoices.splice(
        format_question.answer - 1, //insert at a random index
        0,  //dont remove any element of the array
        data.correct_answer //the data to be inserted to the array
      );

      answerChoices.forEach((choice, i) => {
        format_question["choice" + (i+1)] = he.decode(choice)
        //insert  choice to format_question object
      });
      console.log(answerChoices);
      return format_question;
    })
  //  questions = loadedQuestions;
startGame();
  })
  .catch(err => {
    console.error(err);
  });

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
 loader.classList.add("hidden");
};


function getNewQuestion() {

  // if no questions are left
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      localStorage.setItem("mostRecentScore", score);
      return window.location.assign("/end.html") //go to end.html
  }

questionCounter++;
 progressText.innerText = `Question : ${questionCounter}/${MAX_QUESTIONS}`;
 progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

const questionIndex = Math.floor(Math.random() * availableQuestions.length);
currentQuestion = availableQuestions[questionIndex]
question.innerText = currentQuestion.question;
choices.forEach(choice => {
  const number = choice.dataset['number']
  choice.innerText = currentQuestion['choice' + number]
});

availableQuestions.splice(questionIndex, 1) //remove used questions
acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number']

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

    if (classToApply === "correct") {
     incrementScore(CORRECT_BONUS);
   }


    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(()=> {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()
    }, 500)
  })
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
