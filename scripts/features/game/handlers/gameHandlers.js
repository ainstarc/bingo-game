export class GameHandlers {
  constructor(game, elements, renderer) {
    this.game = game;
    this.elements = elements;
    this.renderer = renderer;
    this.currentInputNumber = 1;
    this.userInputBoard = Array(25).fill(null);
  }

  handleBoardInput(index) {
    if (this.currentInputNumber > 25 || this.userInputBoard[index] !== null)
      return;
    this.userInputBoard[index] = this.currentInputNumber++;
    this.updateInputBoard();

    if (this.currentInputNumber > 25) {
      this.elements.inputMessage.textContent =
        'All numbers set! Click "Start Game" to begin.';
      this.elements.startGameBtn.style.display = "inline-block";
    } else {
      const nextLetter = String.fromCharCode(64 + this.currentInputNumber);
      this.elements.inputMessage.textContent = `Click cell to set alphabet ${nextLetter}`;
    }
  }

  updateInputBoard() {
    this.renderer.updateBoard(
      this.elements.userBoardInput,
      this.userInputBoard,
      Array(25).fill(false)
    );
  }

  generateRandomBoard() {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    numbers.forEach((num, i) => (this.userInputBoard[i] = num));
    this.currentInputNumber = 26;
    this.updateInputBoard();

    this.elements.inputMessage.textContent =
      'Random values filled! Click "Start Game" to begin.';
    this.elements.startGameBtn.style.display = "inline-block";
  }

  startGame() {
    if (this.userInputBoard.includes(null)) {
      this.elements.inputMessage.textContent =
        "Please fill all cells before starting.";
      return;
    }

    this.game.setHumanBoard(this.userInputBoard);
    this.game.generateComputerBoard();

    this.elements.gameUI.style.display = "block";
    this.elements.gameStarter.style.display = "none";

    this.renderGameState();
  }

  resetGame() {
    this.game.reset();
    this.currentInputNumber = 1;
    this.userInputBoard.fill(null);
    this.elements.gameUI.style.display = "none";
    this.elements.gameStarter.style.display = "block";
    this.elements.startGameBtn.style.display = "none";
    this.updateInputBoard();
    this.elements.inputMessage.textContent = "Click cell to set alphabet A";
  }

  handleCellClick(value) {
    if (this.game.makeMove(value)) {
      this.renderGameState();
    }
  }

  renderGameState() {
    const state = this.game.getState();

    this.renderer.updateBoard(
      this.elements.playerBoard,
      state.humanBoard,
      state.humanMarked,
      !state.winner ? (value) => this.handleCellClick(value) : null
    );

    this.renderer.updateBoard(
      this.elements.cpuBoard,
      state.computerBoard,
      state.computerMarked
    );

    this.renderer.updateBingoStatus(
      this.elements.playerBingoStatus,
      state.humanLines
    );
    this.renderer.updateBingoStatus(
      this.elements.cpuBingoStatus,
      state.computerLines
    );

    this.renderer.updateGameStatus(this.elements.status, state);
  }

  bindEvents() {
    this.elements.userBoardInput.addEventListener("click", (e) => {
      if (e.target.classList.contains("cell")) {
        const index = Array.from(e.target.parentNode.children).indexOf(
          e.target
        );
        this.handleBoardInput(index);
      }
    });

    this.elements.fillRandomValuesBtn.onclick = () =>
      this.generateRandomBoard();
    this.elements.startGameBtn.onclick = () => this.startGame();
    this.elements.resetBtn.onclick = () => this.resetGame();

    this.elements.playerBoard.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("cell") &&
        !e.target.classList.contains("marked")
      ) {
        const index = Array.from(e.target.parentNode.children).indexOf(
          e.target
        );
        const value = this.game.getState().humanBoard[index];
        this.handleCellClick(value);
      }
    });
  }

  init() {
    this.updateInputBoard();
    this.elements.inputMessage.textContent = "Click cell to set alphabet A";
    this.bindEvents();
  }
}
