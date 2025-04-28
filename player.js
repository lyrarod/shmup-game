export class Player {
  constructor(game) {
    this.game = game;
    this.width = 128;
    this.height = 128;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = this.game.height;
    this.speed = 4;
    this.lives = 3;
    this.canMove = false;

    this.ship = new Image();
    this.ship.src = "./assets/ship/ship6.png";

    this.exhaust = {
      width: 256 / 4,
      height: 64,
      x: null,
      y: null,
      frameX: Array.from({ length: 4 }, (_, index) => index),
      indexFrameX: 0,
      frameY: 0,
      maxFrame: 4,
      sprite: new Image(),
      frameTimer: 0,
      frameInterval: 1000 / 20,
    };
    this.exhaust.sprite.src = "./assets/ship/turbo_flight.png";

    this.sounds = {
      shoot: new Audio("./assets/audio/LASRGun_Classic_Blaster_A_Fire_03.ogg"),
    };

    this.hitBox = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
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

    this.sounds.shoot.currentTime = 0;
    this.sounds.shoot.volume = 0.3;
    this.sounds.shoot.play();
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
      this.game.ctx.strokeStyle = "#fff";
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);

      // Exhaust
      this.game.ctx.strokeStyle = "#fff";
      this.game.ctx.strokeRect(
        this.exhaust.x,
        this.exhaust.y,
        this.exhaust.width,
        this.exhaust.height
      );

      // Hitbox
      this.game.ctx.strokeStyle = "#f00";
      this.game.ctx.strokeRect(
        this.hitBox.x,
        this.hitBox.y,
        this.hitBox.width,
        this.hitBox.height
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

    this.hitBox.width = 40;
    this.hitBox.height = 90;
    this.hitBox.x = this.x + this.width * 0.5 - 40 * 0.5;
    this.hitBox.y = this.y + this.height * 0.5 - 90 * 0.5;

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
