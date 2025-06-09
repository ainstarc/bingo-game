import { handleUserBoardInput } from "./setup/userBoardInput.js";
import { handleTurn } from "./logic/turnHandler.js";
import { gameState } from "./state/gameState.js";
import './setup/userBoardClickInput.js';


window.playTurn = handleTurn;

// For testing/demo: temporary board input (replace with real form later)
const defaultBoard = Array.from({ length: 25 }, (_, i) => i + 1);
handleUserBoardInput(defaultBoard);

document.getElementById("reset-btn").onclick = () => {
  // Clear states
  gameState.currentTurn = "user";
  gameState.markedNumbers.clear();
  gameState.playerLines.clear();
  gameState.cpuLines.clear();
  gameState.winner = null;

  boardState.player.fill(null);
  boardState.cpu = [];
  boardState.playerMarked.fill(false);
  boardState.cpuMarked.fill(false);

  // For demo, reset to default board again
  const defaultBoard = Array.from({ length: 25 }, (_, i) => i + 1);
  handleUserBoardInput(defaultBoard);

  document.getElementById("status").textContent = "Your turn";
};
