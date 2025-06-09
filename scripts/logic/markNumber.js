import { boardState } from "../state/boardState.js";

export function markNumber(number) {
  boardState.player.forEach((val, i) => {
    if (val === number) boardState.playerMarked[i] = true;
  });
  boardState.cpu.forEach((val, i) => {
    if (val === number) boardState.cpuMarked[i] = true;
  });
}
