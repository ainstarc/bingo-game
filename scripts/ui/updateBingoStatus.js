import { gameState } from "../state/gameState.js";

const BINGO_WORD = ["B", "I", "N", "G", "O"];

function getCrossedString(count) {
  return BINGO_WORD.map((letter, idx) =>
    idx < count ? `<span class="crossed">${letter}</span>` : letter
  ).join("");
}

export function updateBingoStatus() {
  const playerCount = gameState.playerLines.size;
  const cpuCount = gameState.cpuLines.size;

  document.getElementById("player-bingo-status").innerHTML =
    getCrossedString(playerCount);
  document.getElementById("cpu-bingo-status").innerHTML =
    getCrossedString(cpuCount);
}
