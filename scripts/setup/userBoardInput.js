import { boardState } from '../state/boardState.js';
import { renderBoards } from '../ui/renderBoards.js';
import { generateCPUBoard } from './generateCPUBoard.js';

export function handleUserBoardInput(values) {
  if (values.length !== 25 || new Set(values).size !== 25) return alert("Enter 25 unique numbers between 1–25");
  boardState.player = values;
  generateCPUBoard();
  renderBoards();
}