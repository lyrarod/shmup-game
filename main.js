import { Game } from "./game.js";

window.addEventListener("load", () => {
  const game = new Game();

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
