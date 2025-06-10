const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const submitBtn = document.getElementById("submit");
const errorEl = document.getElementById("error");
const messageEl = document.getElementById("message");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(9).fill("");
let player1 = "";
let player2 = "";
let gameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value.trim() || "Player 1";
  player2 = document.getElementById("player-2").value.trim() || "Player 2";

  if (!player1 || !player2) {
    errorEl.textContent = "Please enter both player names";
    errorEl.classList.remove("hidden");
    return;
  }

  errorEl.classList.add("hidden");
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  updateMessage();
});

function updateMessage() {
  messageEl.textContent =
    currentPlayer === "X" ? `${player1}, you're up` : `${player2}, you're up`;
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => handleMove(cell));
});

function handleMove(cell) {
  const index = parseInt(cell.id) - 1;
  if (board[index] || gameOver) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    const winner = currentPlayer === "X" ? player1 : player2;
    messageEl.textContent = `${winner}, congratulations you won!`;
    gameOver = true;
    restartBtn.classList.remove("hidden");
    disableBoard();
    return;
  }

  if (board.every((cell) => cell !== "")) {
    messageEl.textContent = "It's a draw";
    gameOver = true;
    restartBtn.classList.remove("hidden");
    disableBoard();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateMessage();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  return winPatterns.some((pattern) =>
    pattern.every((i) => board[i] === currentPlayer)
  );
}

function disableBoard() {
  cells.forEach((cell) => cell.classList.add("inactive"));
}

restartBtn.addEventListener("click", () => {
  currentPlayer = "X";
  board = Array(9).fill("");
  gameOver = false;

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("inactive");
  });

  restartBtn.classList.add("hidden");
  updateMessage();
});