const playersForm = document.querySelector(".players-form");
const game = document.querySelector(".game");
const btn = document.getElementById("submit"); // FIXED
const restart = document.querySelector(".restart");

const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const messageDiv = document.querySelector(".message"); // FIXED
const gridItems = document.querySelectorAll(".grid-item");

let currentPlayerName = "";
let playerSymbols = {};
let gameOver = false;

btn.addEventListener("click", startGame);

function startGame() {
  const name1 = player1.value.trim();
  const name2 = player2.value.trim();

  if (name1 === "" || name2 === "") {
    alert("Please Enter Player Name");
    return;
  }

  playersForm.classList.add("hidden");
  game.classList.remove("hidden");

  // Randomly assign who starts and give "X" to starter
  if (Math.random() < 0.5) {
    currentPlayerName = name1;
    playerSymbols = {
      [name1]: "X",
      [name2]: "O",
    };
  } else {
    currentPlayerName = name2;
    playerSymbols = {
      [name2]: "X",
      [name1]: "O",
    };
  }

  gameOver = false;

  messageDiv.textContent = `${currentPlayerName}, you're up`;

  // Clear previous board state
  gridItems.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
    cell.addEventListener("click", handleCellClick);
  });
}

function handleCellClick(e) {
  const cell = e.target;

  if (gameOver || cell.textContent !== "") return;

  // Mark the cell
  cell.textContent = playerSymbols[currentPlayerName];
  cell.classList.add("disabled");

  // Check winner
  if (checkWinner()) {
    messageDiv.textContent = `${currentPlayerName}, Congratulations you won!`;
    gameOver = true;
    return;
  }

  // Check draw
  if (checkDraw()) {
    messageDiv.textContent = `It's a Draw`;
    gameOver = true;
    return;
  }

  // Switch player
  switchPlayer();
}

function switchPlayer() {
  currentPlayerName =
    currentPlayerName === player1.value.trim()
      ? player2.value.trim()
      : player1.value.trim();

  messageDiv.textContent = `${currentPlayerName}, you're up`;
}

function checkWinner() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const currentSymbol = playerSymbols[currentPlayerName];

  return winCombinations.some((combo) => {
    return combo.every((index) => {
      return gridItems[index].textContent === currentSymbol;
    });
  });
}

function checkDraw() {
  return [...gridItems].every(
    (cell) => cell.textContent === "X" || cell.textContent === "O"
  );
}

restart.addEventListener("click", restartGame);

function restartGame() {
  gameOver = false;

  const name1 = player1.value.trim();
  const name2 = player2.value.trim();

  if (Math.random() < 0.5) {
    currentPlayerName = name1;
    playerSymbols = {
      [name1]: "X",
      [name2]: "O",
    };
  } else {
    currentPlayerName = name2;
    playerSymbols = {
      [name2]: "X",
      [name1]: "O",
    };
  }

  messageDiv.textContent = `${currentPlayerName}, you're up`;

  gridItems.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
}
