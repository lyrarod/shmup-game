export class Keyboard {
  constructor(game) {
    this.game = game;
    this.lastKey = null;
    this.keyPressed = {};

    window.addEventListener("keydown", ({ code }) => {
      if (this.lastKey === code) return;
      this.lastKey = code;
      this.keyPressed[code] = true;
      // console.log(this.keyPressed);

      if (
        (code === "Enter" && this.lastKey === "Enter") ||
        (code === "Space" && this.lastKey === "Space")
      ) {
        this.game.player.shoot();
        return null;
      }

      if (
        (code === "KeyP" && this.lastKey === "KeyP") ||
        (code === "Escape" && this.lastKey === "Escape")
      ) {
        this.game.togglePause();
        return null;
      }

      if (code === "KeyR" && this.lastKey === "KeyR") {
        if (
          this.game.paused === true ||
          this.game.running === false ||
          this.game.gameOver === true
        ) {
          return null;
        }

        this.game.debug = !this.game.debug;
        // console.log("Debug:", this.game.debug);
        return null;
      }
    });

    window.addEventListener("keyup", ({ code }) => {
      this.lastKey = null;
      this.keyPressed[code] = false;
      // console.log(this.keyPressed);
      delete this.keyPressed[code];
    });

    pause.onclick = () => {
      pause.blur();
      game.togglePause();
    };
    resume.onclick = () => {
      resume.blur();
      game.togglePause();
    };

    left.addEventListener("touchstart", () => {
      this.keyPressed.ArrowLeft = true;
    });
    left.addEventListener("touchend", () => {
      this.keyPressed.ArrowLeft = false;
    });

    right.addEventListener("touchstart", () => {
      this.keyPressed.ArrowRight = true;
    });
    right.addEventListener("touchend", () => {
      this.keyPressed.ArrowRight = false;
    });

    up.addEventListener("touchstart", () => {
      this.keyPressed.ArrowUp = true;
    });
    up.addEventListener("touchend", () => {
      this.keyPressed.ArrowUp = false;
    });

    down.addEventListener("touchstart", () => {
      this.keyPressed.ArrowDown = true;
    });
    down.addEventListener("touchend", () => {
      this.keyPressed.ArrowDown = false;
    });

    fire.addEventListener("touchstart", () => {
      this.game.player.shoot();
    });
  }
}
