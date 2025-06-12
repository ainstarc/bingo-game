import { boardState } from "../state/boardState.js";
import { renderBoards } from "../ui/renderBoards.js";
import { generateCPUBoard } from "./generateCPUBoard.js";
import { gameState } from "../state/gameState.js";
import { updateBingoStatus } from "../ui/updateBingoStatus.js";

const gameStarter = document.getElementById("game-starter");
const inputDiv = document.getElementById("user-board-input");
const messageDiv = document.getElementById("input-message");
const startBtn = document.getElementById("start-game-btn");
const gameUI = document.getElementById("game-ui");
const fillRandomValuesBtn = document.getElementById("fill-random-values-btn");

let currentNumber = 1;
const userInputBoard = Array(25).fill(null);

function renderInputBoard() {
  inputDiv.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = userInputBoard[i]
      ? String.fromCharCode(64 + userInputBoard[i])
      : "";

    cell.dataset.index = i;
    inputDiv.appendChild(cell);
  }
}

function handleCellClick(e) {
  if (e.target.classList.contains("cell")) {
    const idx = Number(e.target.dataset.index);
    if (userInputBoard[idx] === null) {
      userInputBoard[idx] = currentNumber++;
      renderInputBoard();
      if (currentNumber > 25) {
        messageDiv.textContent =
          'All numbers set! Click "Start Game" to begin.';
        startBtn.style.display = "inline-block";
      } else {
        const alphabet = String.fromCharCode(64 + currentNumber);
        messageDiv.textContent = `Click cell to set alphabet ${alphabet}`;
      }
    }
  }
}
inputDiv.addEventListener("click", handleCellClick);

fillRandomValuesBtn.onclick = () => {
  // Create an array with numbers 1 to 25
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

  // Shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  // Assign shuffled numbers to userInputBoard
  // userInputBoard = [...numbers];
  for (let i = 0; i < 25; i++) {
    userInputBoard[i] = numbers[i];
  }

  // Set currentNumber to 26 since board is fully filled
  currentNumber = 26;

  // Render the updated board
  renderInputBoard();

  // Show message and start button
  messageDiv.textContent = 'Random values filled! Click "Start Game" to begin.';
  startBtn.style.display = "inline-block";
};



// Initialize
renderInputBoard();
messageDiv.textContent = "Click cell to set alphabet A";

startBtn.onclick = () => {
  // Validate userInputBoard - should be all numbers 1-25
  if (userInputBoard.includes(null)) {
    messageDiv.textContent = "Please fill all cells before starting.";
    return;
  }
  // Reset game state
  gameUI.style.display = "block";
  gameState.currentTurn = "user";
  gameState.markedNumbers.clear();
  gameState.playerLines.clear();
  gameState.cpuLines.clear();
  gameState.winner = null;

  boardState.player = [...userInputBoard];
  boardState.playerMarked.fill(false);
  generateCPUBoard();
  boardState.cpuMarked.fill(false);

  renderBoards();
  updateBingoStatus();
  document.getElementById("status").textContent = "Your turn";

  // Hide input UI and start button
  gameStarter.style.display = "none";
  inputDiv.style.display = "none";
  messageDiv.style.display = "none";
  startBtn.style.display = "none";
};
