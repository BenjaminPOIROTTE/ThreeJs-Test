
export let score = 0;
export let scoreMultiplier=1 ;


export function getScore() {
    return score;
}
export function setScore(value) {
    score = value;
}
export function getScoreMultiplier() {
    return scoreMultiplier;
}
export function setScoreMultiplier(value) {
    scoreMultiplier = value;
}


export function PrintScore() {
  const scoreElement = document.getElementById("score");
  scoreElement.textContent = `SCORE: ${parseInt(getScore(), 10)}`;
}

export function updateScore() {


    setInterval(() => {
  score = score + 1 * getScoreMultiplier();
}, 1000);

}
