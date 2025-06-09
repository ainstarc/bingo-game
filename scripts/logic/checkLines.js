import { boardState } from '../state/boardState.js';
import { BINGO_LINES } from '../config/constants.js';

export function getCompletedLines(markedBoard) {
  const completed = new Set();
  BINGO_LINES.forEach((line, idx) => {
    if (line.every(i => markedBoard[i])) completed.add(idx);
  });
  return completed;
}