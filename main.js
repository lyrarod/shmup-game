import { Game } from "./game.js";

window.addEventListener("load", () => {
  const game = new Game();

  startBtn.onclick = () => {
    game.start();
    startScreen.style.display = "none";
  };

  pause.onclick = () => {
    pause.blur();
    game.togglePause();
  };
  pause.ontouchstart = () => game.togglePause();
  resume.onclick = () => game.togglePause();
});
