import { boardState } from "../state/boardState.js";
import { renderBoards } from "../ui/renderBoards.js";
import { generateCPUBoard } from "./generateCPUBoard.js";
import { gameState } from "../state/gameState.js";
import { updateBingoStatus } from "../ui/updateBingoStatus.js";

const inputDiv = document.getElementById("user-board-input");
const messageDiv = document.getElementById("input-message");
const startBtn = document.getElementById("start-game-btn");
const gameUI = document.getElementById("game-ui");

let currentNumber = 1;
const userInputBoard = Array(25).fill(null);

function renderInputBoard() {
  inputDiv.innerHTML = "";
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = userInputBoard[i] ?? "";
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
        messageDiv.textContent = `Click cell to set number ${currentNumber}`;
      }
    }
  }
}

inputDiv.addEventListener("click", handleCellClick);

// Initialize
renderInputBoard();
messageDiv.textContent = "Click cell to set number 1";

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
  inputDiv.style.display = "none";
  messageDiv.style.display = "none";
  startBtn.style.display = "none";
};
