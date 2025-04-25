export class Explosion {
  constructor(game, position = {}) {
    this.game = game;
    this.x = position.x;
    this.y = position.y;

    this.explosion = {
      sprite: new Image(),
      frameX: Array.from({ length: 10 }, (_, index) => index),
      indexFrameX: 0,
      frameY: 0,
      frameTimer: 0,
      frameInterval: 30,
      width: 128,
      height: 128,
      x: this.x,
      y: this.y,
      isVisible: true,
    };
    this.explosion.sprite.src = "./assets/bullet/original/explosion.png";

    this.explosions = [];
  }

  create(position = {}) {
    this.explosions.push(new Explosion(this.game, position));
  }

  render(deltaTime) {
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

    if (this.explosion.frameTimer > this.explosion.frameInterval) {
      this.explosion.indexFrameX++;
      if (this.explosion.indexFrameX >= this.explosion.frameX.length) {
        this.isVisible = false;
      }

      this.explosion.frameTimer = 0;
    } else {
      this.explosion.frameTimer += deltaTime;
    }

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

  update(deltaTime) {
    this.explosions.forEach((obj, index) => {
      obj.render(deltaTime);

      if (obj.isVisible === false) {
        this.explosions.splice(index, 1);
      }

      // console.log(this.explosions);
    });
  }
}
