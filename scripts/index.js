import { Game } from "./core/engine/Game.js";
import { setupGameEvents } from "./features/game/setup/eventSetup.js";
import { domElements } from "./ui/domElements.js";

// Initialize the game
const game = new Game();

// Setup all event handlers
setupGameEvents(game, domElements);

// Hide game UI initially
domElements.gameUI.style.display = "none";
