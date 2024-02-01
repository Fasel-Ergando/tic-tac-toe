/* DOM elements */
const gameCells = document.querySelectorAll('.gameCell');
const resetBtn = document.querySelector('.resetBtn');
const gameHeader = document.querySelector('.gameHeader');
const displayScore = document.querySelector('.displayScore');
const playerScores = document.querySelector('.playerScores');
const closeBoard = document.querySelector('.closeBoard');
const playerX = document.querySelector('.playerX');
const playerO = document.querySelector('.playerO');
const isWinning = document.querySelector('.isWinning');

let running;
let scoreO = 0;
let scoreX = 0;

let currentPlayer = 'X';
let placeholders = ['', '', '', '', '', '', '', '', ''];
const win_conditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

window.addEventListener('DOMContentLoaded', e => {
  if (e.target.readyState === 'interactive') {
    initGame();
  }
})
function initGame() {
  gameCells.forEach(gameCell => {
    gameCell.addEventListener('click', (e) => {
      playGame(e);
    });
  });
  resetBtn.addEventListener('click', resetGame);
  running = true;
  displayScore.addEventListener('click', e => {
    playerScores.classList.add('animate')
  });
  closeBoard.addEventListener('click', e => {
    playerScores.classList.remove('animate');
  });
}

function playGame(cell) {
  const currentEl = cell.target;
  const cellIndex = currentEl.getAttribute('data-index');
  //exit if the cell contains a value
  if (currentEl.textContent || !running) return;
  
  //update the cell if the cell does not have any value in it
  currentEl.textContent = currentPlayer;
  placeholders[cellIndex] = currentEl.textContent;
  checkWin();
  flipPlayer();
}

function flipPlayer() {
  currentPlayer = (currentPlayer === 'X')? 
    'O':
    'X';
} 


function checkWin() {
  for (let i = 0; i < win_conditions.length; i++) {
    const condition = win_conditions[i];
    const cellA = placeholders[condition[0]];
    const cellB = placeholders[condition[1]];
    const cellC = placeholders[condition[2]];

    //check if any of the cells are not empty
    if (cellA !== ''&&cellB !== ''&&cellC !== '') {
      if ((cellA === cellB) && (cellB === cellC)) {
        gameCells[condition[0]].classList.add('checkCell');
        gameCells[condition[1]].classList.add('checkCell');
        gameCells[condition[2]].classList.add('checkCell');
        gameHeader.textContent = `${currentPlayer} won!`;
        setPlayerScores();
        running = false;
      } 
    }

    if (!placeholders.includes('')) {
      //the game is a draw
      gameHeader.textContent = "It's a draw!";
    }
  }
}

function setPlayerScores() {
  (currentPlayer === 'X')?scoreX++ :scoreO++;
  playerX.textContent = scoreX;
  playerO.textContent = scoreO;
  isWinning.innerHTML = (scoreO > scoreX)? 
  'O is winning.':
   (scoreO === scoreX && (scoreX!==0 && scoreO !== 0))?
   'Tie!':
   'X is winning.';
}

function resetGame() {
  running = true;
  currentPlayer = 'X';
  placeholders = ['', '', '', '', '', '', '', '', ''];
  gameCells.forEach(gameCell => {
    gameCell.textContent = '';
    gameCell.classList.remove('checkCell');
  });
  gameHeader.textContent = 'Tic Tac Toe';
};
