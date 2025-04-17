import { Game } from "./game.js";
const game = new Game();

window.addEventListener("load", () => {
  startBtn.onclick = () => {
    game.start();
    startBtn.blur();
    startScreen.style.display = "none";
  };

  pause.onclick = () => {
    pause.blur();
    game.togglePause();
  };
});
