export class Board {
  constructor(size = 5) {
    this.size = size;
    this.cells = Array(size * size).fill(null);
    this.marked = Array(size * size).fill(false);
  }

  setCell(index, value) {
    if (index < 0 || index >= this.cells.length) return false;
    this.cells[index] = value;
    return true;
  }

  markCell(value) {
    this.cells.forEach((cell, index) => {
      if (cell === value) this.marked[index] = true;
    });
  }

  isCellMarked(index) {
    return this.marked[index];
  }

  reset() {
    this.cells.fill(null);
    this.marked.fill(false);
  }

  getCells() {
    return [...this.cells];
  }

  getMarked() {
    return [...this.marked];
  }
}
