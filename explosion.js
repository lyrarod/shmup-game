export class Explosion {
  constructor(game, position = {}) {
    this.game = game;

    this.explosion = {
      width: 128,
      height: 128,
      x: position.x ?? 0,
      y: position.y ?? 0,
      sprite: new Image(),
      frameX: Array.from({ length: 10 }, (_, index) => index),
      indexFrameX: 0,
      frameY: 0,
      frameTimer: 0,
      frameInterval: 30,
      sound: new Audio("./assets/audio/EXPLDsgn_Explosion_Impact_14.ogg"),
      isVisible: true,
      playSound: () => {
        this.explosion.sound.currentTime = 0;
        this.explosion.sound.volume = 1;
        this.explosion.sound.play();
      },
    };
    this.explosion.sprite.src = "./assets/bullet/original/explosion.png";

    this.explosions = [];
  }

  show(position = {}) {
    this.explosions.push(new Explosion(this.game, position));
    this.explosion.playSound();
  }

  drawAndDebug() {
    this.game.ctx.drawImage(
      this.explosion.sprite,
      this.explosion.frameX.at(this.explosion.indexFrameX) *
        this.explosion.width,
      this.explosion.frameY * this.explosion.height,
      this.explosion.width,
      this.explosion.height,
      this.explosion.x,
      this.explosion.y,
      this.explosion.width,
      this.explosion.height
    );

    if (this.game.debug === true) {
      this.game.ctx.strokeStyle = "#fff";
      this.game.ctx.strokeRect(
        this.explosion.x,
        this.explosion.y,
        this.explosion.width,
        this.explosion.height
      );
    }
  }

  render(deltaTime) {
    this.drawAndDebug();

    if (this.explosion.frameTimer > this.explosion.frameInterval) {
      this.explosion.indexFrameX++;
      if (this.explosion.indexFrameX >= this.explosion.frameX.length) {
        this.explosion.isVisible = false;
      }
      this.explosion.frameTimer = 0;
    } else {
      this.explosion.frameTimer += deltaTime;
    }
  }

  update(deltaTime) {
    this.explosions.forEach((obj, index) => {
      obj.render(deltaTime);

      if (obj.explosion.isVisible === false) {
        this.explosions.splice(index, 1);
      }
      // console.log(this.explosions);
    });
  }
}
