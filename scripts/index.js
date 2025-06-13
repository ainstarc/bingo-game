import { Game } from "./core/engine/Game.js";
import { setupGameEvents } from "./features/game/setup/eventSetup.js";

// Initialize the game
const game = new Game();

// Setup all event handlers
setupGameEvents(game);

// Hide game UI initially
document.getElementById("game-ui").style.display = "none";
