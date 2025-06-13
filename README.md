# Bingo Game

A fun and interactive Bingo game where you can play against the computer. Customize your board, mark numbers, and aim to complete lines to win!

## Features

- **Customizable Player Board**: Set your own board numbers or fill them randomly.
- **Interactive Gameplay**: Take turns marking numbers and compete against the computer.
- **Dynamic UI**: Real-time updates for boards, status, and Bingo progress.
- **Responsive Design**: Optimized for various screen sizes.

## How to Play

1. **Set Your Board**:
   - Click on cells to set your board numbers manually.
   - Alternatively, use the "Fill Random Values" button to auto-generate numbers.

2. **Start the Game**:
   - Click the "Start Game" button once your board is ready.

3. **Gameplay**:
   - Take turns marking numbers.
   - The computer will automatically pick numbers for its turn.

4. **Win Condition**:
   - Complete 5 lines (horizontal, vertical, or diagonal) to win.
   - If both players complete 5 lines simultaneously, it's a draw.

5. **Reset**:
   - Use the "Reset Game" button to start a new game.

## Project Structure

- **HTML**: `index.html` - The main entry point for the game.
- **CSS**: `styles/game.css` - Styles for the game UI.
- **JavaScript**:
  - `scripts/` - Contains all game logic, state management, and UI updates.
    - `config/` - Constants like board size and Bingo lines.
    - `logic/` - Core game logic (e.g., marking numbers, checking lines).
    - `setup/` - Board setup and user input handling.
    - `state/` - Game and board state management.
    - `ui/` - Functions for rendering and updating the UI.
    - `utils/` - Utility functions like shuffling arrays.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Future Enhancements

- Add multiplayer support.
- Implement different difficulty levels for the computer.
- Enhance animations and sound effects for a more engaging experience.

Enjoy the game!