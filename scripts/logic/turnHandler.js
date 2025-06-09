import { gameState } from "../state/gameState.js";
import { markNumber } from "./markNumber.js";
import { getCompletedLines } from "./checkLines.js";
import { boardState } from "../state/boardState.js";
import { renderBoards } from "../ui/renderBoards.js";
import { updateStatus } from "../ui/updateStatus.js";
import { checkWinner } from "./winnerChecker.js";
import { updateBingoStatus } from "../ui/updateBingoStatus.js";

export function handleTurn(userPicked) {
  if (gameState.winner) return;

  markNumber(userPicked);

  gameState.playerLines = getCompletedLines(boardState.playerMarked);
  gameState.cpuLines = getCompletedLines(boardState.cpuMarked);
  updateBingoStatus();

  let result = checkWinner();
  if (result) {
    gameState.winner = result;
    updateStatus(result);
    renderBoards();
    return;
  }

  const available = boardState.cpu.filter(
    (n) => !gameState.markedNumbers.has(n)
  );
  const cpuPick = available[Math.floor(Math.random() * available.length)];

  markNumber(cpuPick);
  gameState.markedNumbers.add(cpuPick);
  gameState.playerLines = getCompletedLines(boardState.playerMarked);
  console.log(gameState.playerLines.size);
  gameState.cpuLines = getCompletedLines(boardState.cpuMarked);
  console.log(gameState.cpuLines.size);
  updateBingoStatus();

  result = checkWinner();
  if (result) {
    gameState.winner = result;
    updateStatus(result);
  }

  renderBoards();
}
