import { shuffle } from '../utils/shuffle.js';
import { boardState } from '../state/boardState.js';

export function generateCPUBoard() {
  const values = Array.from({ length: 25 }, (_, i) => i + 1);
  boardState.cpu = shuffle(values);
}