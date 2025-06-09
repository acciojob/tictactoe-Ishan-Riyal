const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const submitBtn = document.getElementById("submit");

const messageEl = document.getElementById("message");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(9).fill("");
let player1 = "";
let player2 = "";
let gameOver = false;

// Handle Name Submission
submitBtn.addEventListener("click", submit);

function submit() {
  player1 = document.getElementById("player1").value.trim();
  player2 = document.getElementById("player2").value.trim();

  if (!player1 || !player2) {
    alert("Please enter both player names");
    return;
  }

  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  updateMessage();
}

// Update turn message
function updateMessage() {
  messageEl.textContent =
    currentPlayer === "X" ? `${player1}, you are up` : `${player2}, you are up`;
}

// Handle each cell click
cells.forEach((cell) => {
  cell.addEventListener("click", () => handleMove(cell));
});

// Handle a move
function handleMove(cell) {
  const index = parseInt(cell.id) - 1;

  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === "X" ? player1 : player2;
    messageEl.textContent = `${winner}, congratulations you won!`;
    gameOver = true;
    showRestartButton();
    return;
  }

  if (board.every((cell) => cell !== "")) {
    messageEl.textContent = `It's a draw`;
    gameOver = true;
    showRestartButton();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage();
}

// Check win condition
function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // cols
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  return winPatterns.some((pattern) =>
    pattern.every((i) => board[i] === currentPlayer)
  );
}

// Show restart button
function showRestartButton() {
  restartBtn.classList.remove("hidden");
}

// Handle restart
restartBtn.addEventListener("click", resetGame);

// reset game
function resetGame() {
  currentPlayer = "X";
  board = Array(9).fill("");
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
  });

  restartBtn.classList.add("hidden");
  updateMessage();
}
