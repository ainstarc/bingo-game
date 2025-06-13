import { Board } from "./Board.js";
import { Player } from "./Player.js";
import { BINGO_LINES } from "../constants/gameConstants.js";

export class Game {
  constructor() {
    this.humanPlayer = new Player("human");
    this.computerPlayer = new Player("computer");
    this.currentTurn = "human";
    this.markedNumbers = new Set();
    this.winner = null;
    this.initializeGame();
  }

  initializeGame() {
    const humanBoard = new Board();
    const computerBoard = new Board();

    this.humanPlayer.setBoard(humanBoard);
    this.computerPlayer.setBoard(computerBoard);
  }

  setHumanBoard(values) {
    if (!Array.isArray(values) || values.length !== 25) return false;
    values.forEach((value, index) => {
      this.humanPlayer.board.setCell(index, value);
    });
    return true;
  }

  generateComputerBoard() {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    numbers.forEach((value, index) => {
      this.computerPlayer.board.setCell(index, value);
    });
  }

  makeMove(number) {
    if (this.winner || !number || this.markedNumbers.has(number)) return false;

    this.markedNumbers.add(number);
    this.humanPlayer.makeMove(number);
    this.computerPlayer.makeMove(number);

    this.updateCompletedLines();
    if (this.checkWinner()) return true;

    this.computerTurn();
    this.updateCompletedLines();
    this.checkWinner();

    return true;
  }

  computerTurn() {
    const availableNumbers = this.computerPlayer.board
      .getCells()
      .filter((n) => n !== null && !this.markedNumbers.has(n));

    if (availableNumbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const number = availableNumbers[randomIndex];

    this.markedNumbers.add(number);
    this.humanPlayer.makeMove(number);
    this.computerPlayer.makeMove(number);
  }

  updateCompletedLines() {
    const humanMarked = this.humanPlayer.board.getMarked();
    const computerMarked = this.computerPlayer.board.getMarked();

    BINGO_LINES.forEach((line, index) => {
      if (line.every((i) => humanMarked[i])) {
        this.humanPlayer.addCompletedLine(index);
      }
      if (line.every((i) => computerMarked[i])) {
        this.computerPlayer.addCompletedLine(index);
      }
    });
  }

  checkWinner() {
    const humanLines = this.humanPlayer.getCompletedLinesCount();
    const computerLines = this.computerPlayer.getCompletedLinesCount();

    if (humanLines >= 5 && computerLines >= 5) {
      this.winner = "draw";
    } else if (humanLines >= 5) {
      this.winner = "human";
    } else if (computerLines >= 5) {
      this.winner = "computer";
    }

    return this.winner !== null;
  }

  getState() {
    return {
      humanBoard: this.humanPlayer.board.getCells(),
      computerBoard: this.computerPlayer.board.getCells(),
      humanMarked: this.humanPlayer.board.getMarked(),
      computerMarked: this.computerPlayer.board.getMarked(),
      humanLines: this.humanPlayer.getCompletedLinesCount(),
      computerLines: this.computerPlayer.getCompletedLinesCount(),
      winner: this.winner,
      currentTurn: this.currentTurn,
    };
  }

  reset() {
    this.humanPlayer.reset();
    this.computerPlayer.reset();
    this.markedNumbers.clear();
    this.currentTurn = "human";
    this.winner = null;
  }
}
