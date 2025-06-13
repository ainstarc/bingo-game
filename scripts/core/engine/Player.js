export class Player {
  constructor(type = "human") {
    this.type = type;
    this.board = null;
    this.completedLines = new Set();
  }

  setBoard(board) {
    this.board = board;
  }

  makeMove(number) {
    if (!this.board) return false;
    this.board.markCell(number);
    return true;
  }

  addCompletedLine(lineIndex) {
    this.completedLines.add(lineIndex);
  }

  getCompletedLinesCount() {
    return this.completedLines.size;
  }

  reset() {
    this.completedLines.clear();
    if (this.board) {
      this.board.reset();
    }
  }
}
