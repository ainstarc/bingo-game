import { handleTurn } from "./logic/turnHandler.js";
import { gameState } from "./state/gameState.js";
import { boardState } from "./state/boardState.js";
import "./setup/userBoardClickInput.js"; // this sets up interactive click input

window.playTurn = handleTurn;

document.getElementById("reset-btn").onclick = () => {
  // Clear core game state
  gameState.currentTurn = "user";
  gameState.markedNumbers.clear();
  gameState.playerLines.clear();
  gameState.cpuLines.clear();
  gameState.winner = null;

  // Clear board data
  boardState.player.fill(null);
  boardState.cpu = [];
  boardState.playerMarked.fill(false);
  boardState.cpuMarked.fill(false);

  // Hide the game UI and show input again
  document.getElementById("game-ui").style.display = "none";

  // Reload page to re-initialize input UI
  // (simplest and ensures clean state)
  window.location.reload();
};
