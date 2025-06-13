# Bingo Game

A fun and interactive Bingo game where you can play against the computer. Customize your board, mark numbers, and aim to complete lines to win!

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bingo-game.git
   ```

2. Open the `index.html` file in your browser, or serve it using a local development server:

   ```bash
   # Using Python
   python -m http.server

   # Or using Node.js's http-server
   npx http-server
   ```

3. Start playing! No additional setup required.

## Features

- **Customizable Player Board**: Set your own board numbers or fill them randomly
- **Interactive Gameplay**: Take turns marking numbers and compete against the computer
- **Dynamic UI**: Real-time updates for boards, status, and Bingo progress
- **Responsive Design**: Optimized for various screen sizes
- **Modular Architecture**: Clean separation of concerns for maintainability

## How to Play

1. **Set Your Board**:

   - Click on cells to set your board numbers manually (A through Y)
   - Alternatively, use the "Fill Random Values" button to auto-generate numbers

2. **Start the Game**:

   - Click the "Start Game" button once your board is ready

3. **Gameplay**:

   - Click on numbers in your board to mark them
   - The computer will automatically make its move after yours
   - Watch your BINGO status update as you complete lines

4. **Win Condition**:

   - Complete 5 lines (horizontal, vertical, or diagonal) to win
   - If both players complete 5 lines simultaneously, it's a draw

5. **Reset**:
   - Use the "Reset Game" button to start a new game at any time

## Architecture

The project follows a modular architecture focusing on clean code principles and clear separation of concerns:

```
scripts/
├── core/                 # Core game logic and engine
│   ├── constants/       # Game constants and configurations
│   └── engine/         # Core game classes (Board, Game, Player)
├── features/            # Feature-specific modules
│   └── game/
│       ├── handlers/   # Game event handlers and state management
│       └── setup/      # Game initialization and setup
├── ui/                  # UI-related components
│   ├── renderers/     # UI rendering logic
│   └── domElements.js # Centralized DOM element references
└── index.js            # Application entry point

styles/
├── base.css            # Core styles and variables
├── game.css           # Main stylesheet
└── components/        # Component-specific styles
    ├── board.css     # Game board styles
    ├── buttons.css   # Button components
    ├── layout.css    # Layout structure
    └── game-container.css # Game container styles
```

### Key Components

- **Core Engine**:

  - `Board.js`: Manages board state, number validation, and line completion
  - `Game.js`: Controls game flow, turn management, and win conditions
  - `Player.js`: Handles player actions and state

- **UI Layer**:

  - `bingoRenderer.js`: Manages all UI updates and rendering operations
  - `domElements.js`: Centralizes DOM element access and manipulation

- **Game Features**:
  - `gameHandlers.js`: Manages game events and user interactions
  - `eventSetup.js`: Initializes game components and binds events

## Technical Details

The game is built using vanilla JavaScript with a focus on:

- ES6+ features for modern JavaScript functionality
- Event-driven architecture for loose coupling
- Modular CSS with component-based styling
- Responsive design principles
- Clean code practices and clear separation of concerns

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Styling

The CSS is organized into modular components:

```
styles/
├── base.css           # Core variables and base styles
└── components/        # Component-specific styles
    ├── board.css     # Game board styles
    ├── buttons.css   # Button styles
    └── layout.css    # Layout and responsive design
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Future Enhancements

- Multiplayer support via WebSocket
- Difficulty levels for the computer opponent
- Enhanced animations and sound effects
- Statistics tracking and high scores
- Theme customization options

Enjoy the game!
