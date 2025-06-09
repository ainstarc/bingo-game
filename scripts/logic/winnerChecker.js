import { gameState } from '../state/gameState.js';

export function checkWinner() {
  if (gameState.playerLines.size >= 5 && gameState.cpuLines.size >= 5) return 'Draw';
  if (gameState.playerLines.size >= 5) return 'You Win!';
  if (gameState.cpuLines.size >= 5) return 'Computer Wins!';
  return null;
}