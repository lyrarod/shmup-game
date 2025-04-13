export class Player {
  constructor(game) {
    this.game = game;
    this.width = 128;
    this.height = 128;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height;
    this.speed = 4;
    this.colors = ["purple"];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.lives = 3;
    this.canMove = false;

    this.ship = new Image();
    this.ship.src = "./assets/ship6.png";

    this.exhaust = {
      x: null,
      y: null,
      width: 256 / 4,
      height: 64,
      // frameX: [0, 1, 2, 3],
      frameX: Array.from({ length: 4 }, (_, index) => index),
      indexFrameX: 0,
      frameY: 0,
      maxFrame: 4,
      sprite: new Image(),
      frameTimer: 0,
      frameInterval: 1000 / 20,
    };
    // console.log(this.exhaust.frameX);

    this.exhaust.sprite.src = "./assets/turbo_flight.png";
  }

  reset() {
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height;
    this.lives = 3;
  }

  takeDamage(damage) {
    this.lives -= damage;

    if (this.lives >= 0) {
      this.game.livesHud.innerText = this.lives;
      this.x = this.game.width * 0.5 - this.width * 0.5;
      this.y = this.game.height;
    }
  }

  shoot() {
    if (
      this.game.paused === true ||
      this.game.running === false ||
      this.game.gameOver === true
    ) {
      return null;
    }

    this.game.bullet.addBullet();

    this.game.sounds.shoot.currentTime = 0;
    this.game.sounds.shoot.volume = 0.2;
    this.game.sounds.shoot.play();
  }

  render() {
    // Player
    this.game.ctx.drawImage(this.ship, this.x, this.y, this.width, this.height);

    // Exhaust Position and Size
    this.exhaust.x = this.x + this.width * 0.5 - this.exhaust.width * 0.5;
    this.exhaust.y = this.y + this.height - this.exhaust.height * 0.25;

    // Exhaust
    this.game.ctx.drawImage(
      this.exhaust.sprite,
      this.exhaust.frameX[this.exhaust.indexFrameX] * this.exhaust.width,
      this.exhaust.frameY * this.exhaust.height,
      this.exhaust.width,
      this.exhaust.height,
      this.exhaust.x,
      this.exhaust.y,
      this.exhaust.width,
      this.exhaust.height
    );

    if (this.game.debug === true) {
      // Player
      this.game.ctx.strokeStyle = this.color;
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);

      // Exhaust
      this.game.ctx.strokeStyle = this.color;
      this.game.ctx.strokeRect(
        this.exhaust.x,
        this.exhaust.y,
        this.exhaust.width,
        this.exhaust.height
      );
    }
  }

  update(deltaTime) {
    const { keyPressed } = this.game.keyboard;

    this.render();

    this.canMove = true;
    if (this.y + this.height + 50 > this.game.height) {
      this.y -= 2;
      this.canMove = false;
    }

    if (this.exhaust.frameTimer > this.exhaust.frameInterval) {
      this.exhaust.indexFrameX++;
      if (this.exhaust.indexFrameX >= this.exhaust.frameX.length) {
        this.exhaust.indexFrameX = 0;
      }
      this.exhaust.frameTimer = 0;
    } else {
      this.exhaust.frameTimer += deltaTime;
    }

    if (this.canMove) {
      if (
        (keyPressed.KeyD || keyPressed.ArrowRight) &&
        this.x + this.width * 0.6 < this.game.width
      ) {
        this.x += this.speed;
      }
      if (
        (keyPressed.KeyA || keyPressed.ArrowLeft) &&
        this.x > -this.width * 0.4
      ) {
        this.x -= this.speed;
      }

      if ((keyPressed.KeyW || keyPressed.ArrowUp) && this.y > 0) {
        this.y -= this.speed;
      }
      if (
        (keyPressed.KeyS || keyPressed.ArrowDown) &&
        this.y + this.height + 50 < this.game.height
      ) {
        this.y += this.speed;
      }
    }
  }
}
