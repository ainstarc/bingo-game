export class BoardRenderer {
  static displayValue(value) {
    return value ? String.fromCharCode(64 + value) : "";
  }

  static renderCell(value, isMarked, onClick = null) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = this.displayValue(value);

    if (isMarked) {
      cell.classList.add("marked");
    }

    if (onClick) {
      cell.onclick = onClick;
    }

    return cell;
  }

  static renderBoard(boardElement, cells, marked, onCellClick = null) {
    boardElement.innerHTML = "";
    cells.forEach((value, index) => {
      const cell = this.renderCell(
        value,
        marked[index],
        onCellClick ? () => onCellClick(value) : null
      );
      boardElement.appendChild(cell);
    });
  }

  static updateBingoStatus(element, completedLines) {
    const BINGO = ["B", "I", "N", "G", "O"];
    element.innerHTML = BINGO.map((letter, idx) =>
      idx < completedLines ? `<span class="crossed">${letter}</span>` : letter
    ).join("");
  }
}
