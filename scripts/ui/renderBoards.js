import { boardState } from "../state/boardState.js";

export function renderBoards() {
  const playerBoard = document.getElementById("player-board");
  const cpuBoard = document.getElementById("cpu-board");

  playerBoard.innerHTML = "";
  boardState.player.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.textContent = displayValue(val); // ✅ fix here

    cell.className = "cell";
    if (boardState.playerMarked[i]) cell.classList.add("marked");
    cell.onclick = () => window.playTurn(val); // attached globally
    playerBoard.appendChild(cell);
  });

  cpuBoard.innerHTML = "";
  boardState.cpu.forEach((val, i) => {
    const cell = document.createElement("div");
    cell.textContent = boardState.cpuMarked[i] ? displayValue(val) : ""; // ✅ apply A–Y here too
    cell.className = "cell";
    if (boardState.cpuMarked[i]) cell.classList.add("marked");
    cpuBoard.appendChild(cell);
  });
}

function displayValue(value) {
  return String.fromCharCode(64 + value); // 1 → A, 2 → B, ..., 25 → Y
}
