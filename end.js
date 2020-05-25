const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScore.innerText = mostRecentScore;

const highscore = JSON.parse(localStorage.getItem('highscore')) || []; //parse highscore, ig highscore is null, get new empty array
const MAX_HIGH_SCORE = 5;

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value; //if no value, button is disabled
});

saveHighScore = e => {
  e.preventDefault();

  const score = {
    score : mostRecentScore,
    name : username.value
  };
  highscore.push(score) //push new score into array
  highscore.sort((a,b) => b.score - a.score) //sort from highest score, return b score if higher than a
  highscore.splice(MAX_HIGH_SCORE) //max no of highscore

  localStorage.setItem('highscore', JSON.stringify(highscore)) //create highscore in localStorage
  window.location.assign("/intro.html")
};
