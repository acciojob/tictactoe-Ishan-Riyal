const playersForm = document.querySelector(".players-form");
const game = document.querySelector(".game");
const btn = document.querySelector(".btn");
const restart = document.querySelector(".restart");

const player1 = document.getElementById("player-1");
const player2 = document.getElementById("player-2");
const activePlayer = document.querySelector(".active-player");
const gridItems = document.querySelectorAll(".grid-item");

let currentPlayerName = "";
let currentPlayer = "X";
let playerSymbols = {};
let gameOver = false;

btn.addEventListener("click", startGame);

function startGame() {
  playersForm.classList.add("hidden");
  game.classList.remove("hidden");

  const name1 = player1.value.trim();
  const name2 = player2.value.trim();

  if (player1.value.trim() === "" || player2.value.trim() === "") {
    alert("Please Enter Player Name");
    return;
  }

  // Randomly assign player who starts, but always give "X" to the starter
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

  currentSymbol = "X";
  gameOver = false;

  activePlayer.textContent = `${currentPlayerName}, you're up`;

  // Clear Previous Board
  gridItems.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
    cell.addEventListener("click", handleCellClick);
  });
}

function handleCellClick(e) {
  const cell = e.target;

  if (gameOver || cell.textContent !== "") return;

  // Mark Cell
  cell.textContent = playerSymbols[currentPlayerName];
  cell.classList.add("disabled");

  // Check for winner
  if (checkWinner()) {
    activePlayer.textContent = `${currentPlayerName}, Congratulations you won!`;
    gameOver = true;
    return;
  }

  // Check for Draw
  if (checkDraw()) {
    activePlayer.textContent = `It's a Draw`;
    gameOver = true;
    return;
  }

  // Switch Player
  switchPlayer();
}

function switchPlayer() {
  currentPlayerName =
    currentPlayerName === player1.value.trim()
      ? player2.value.trim()
      : player1.value.trim();

  activePlayer.textContent = `${currentPlayerName}, you're up`;
}

function checkWinner() {
  const winCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
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
  // Reset game state
  gameOver = false;

  // Always start with X again (optional: randomize if you prefer)
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

  activePlayer.textContent = `${currentPlayerName}, you're up`;

  // Clear board and reset interaction
  gridItems.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
}
