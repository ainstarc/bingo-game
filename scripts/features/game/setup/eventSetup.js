import { GameHandlers } from "../handlers/gameHandlers.js";
import { BingoRenderer } from "../../../ui/renderers/bingoRenderer.js";

export function setupGameEvents(game, elements) {
  const renderer = BingoRenderer;
  const handlers = new GameHandlers(game, elements, renderer);
  handlers.init();

  // Setup input board click handlers
  domElements.userBoardInput.addEventListener("click", (e) => {
    if (e.target.classList.contains("cell")) {
      const index = Array.from(e.target.parentNode.children).indexOf(e.target);
      handleBoardInput(index);
    }
  });

  // Fill random values button
  domElements.fillRandomValuesBtn.onclick = () => {
    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    numbers.forEach((num, i) => (userInputBoard[i] = num));
    currentInputNumber = 26;
    updateInputBoard();

    domElements.inputMessage.textContent =
      'Random values filled! Click "Start Game" to begin.';
    domElements.startGameBtn.style.display = "inline-block";
  };

  // Start game button
  domElements.startGameBtn.onclick = () => {
    if (userInputBoard.includes(null)) {
      domElements.inputMessage.textContent =
        "Please fill all cells before starting.";
      return;
    }

    game.setHumanBoard(userInputBoard);
    game.generateComputerBoard();

    domElements.gameUI.style.display = "block";
    domElements.gameStarter.style.display = "none";

    const state = game.getState();
    renderGameState(state);
  };

  // Reset button
  domElements.resetBtn.onclick = () => {
    game.reset();
    currentInputNumber = 1;
    userInputBoard.fill(null);
    domElements.gameUI.style.display = "none";
    domElements.gameStarter.style.display = "block";
    domElements.startGameBtn.style.display = "none";
    updateInputBoard();
    domElements.inputMessage.textContent = "Click cell to set alphabet A";
  };
  // Player board click handler
  domElements.playerBoard.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("cell") &&
      !e.target.classList.contains("marked")
    ) {
      const index = Array.from(e.target.parentNode.children).indexOf(e.target);
      const value = game.getState().humanBoard[index];
      if (game.makeMove(value)) {
        const newState = game.getState();
        renderGameState(newState);
      }
    }
  });
  function renderGameState(state) {
    // Render boards
    BoardRenderer.renderBoard(
      domElements.playerBoard,
      state.humanBoard,
      state.humanMarked
    );

    BoardRenderer.renderBoard(
      domElements.cpuBoard,
      state.computerBoard,
      state.computerMarked
    );

    // Update BINGO status
    BoardRenderer.updateBingoStatus(
      domElements.playerBingoStatus,
      state.humanLines
    );
    BoardRenderer.updateBingoStatus(
      domElements.cpuBingoStatus,
      state.computerLines
    );

    // Update game status
    if (state.winner) {
      domElements.status.textContent =
        state.winner === "draw"
          ? "Game Over - It's a Draw!"
          : state.winner === "human"
          ? "You Win!"
          : "Computer Wins!";
    } else {
      domElements.status.textContent = "Your turn";
    }
  }

  // Initial setup
  updateInputBoard();
  domElements.inputMessage.textContent = "Click cell to set alphabet A";
}
