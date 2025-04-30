export class Bullet {
  constructor(game) {
    this.game = game;
    this.width = 128;
    this.height = 128;
    this.x = game.player.x + game.player.width * 0.5 - this.width * 0.5;
    this.y = game.player.y - this.height;
    this.speed = 14;
    this.canRemove = false;
    this.bullets = [];

    this.sprite = new Image();
    this.sprite.src = "./assets/bullet/original/shot.png";

    this.frameX = Array.from({ length: 5 }, (_, index) => index);
    this.indexFrameX = 0;
    this.frameY = 0;
    this.frameTimer = 0;
    this.frameInterval = 60;

    this.hitbox = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };
  }

  addBullet() {
    this.bullets.push(new Bullet(this.game));
  }

  bulletHitbox() {
    this.hitbox.width = 12;
    this.hitbox.height = 70;
    this.hitbox.x = this.x + this.width * 0.5 - this.hitbox.width * 0.65;
    this.hitbox.y = this.y + this.height * 0.5 - this.hitbox.height * 0.1;
  }

  bulletFrame(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      this.indexFrameX++;
      if (this.indexFrameX >= this.frameX.length) {
        this.indexFrameX = this.frameX.at(-1);
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  render() {
    if (this.game.debug === true) {
      // Bullet
      this.game.ctx.strokeStyle = "#fff";
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);

      // Hitbox
      this.game.ctx.strokeStyle = "#f00";
      this.game.ctx.strokeRect(
        this.hitbox.x,
        this.hitbox.y,
        this.hitbox.width,
        this.hitbox.height
      );
    }

    this.game.ctx.drawImage(
      this.sprite,
      this.frameX.at(this.indexFrameX) * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.y -= this.speed;
  }

  update(deltaTime) {
    const { enemies, bosses, collisionDetection, explosion } = this.game;

    this.bullets.forEach((bullet, index) => {
      bullet.render();
      bullet.bulletHitbox();
      bullet.bulletFrame(deltaTime);

      enemies.forEach((enemy) => {
        if (collisionDetection(enemy.hitbox, bullet.hitbox)) {
          enemy.takeDamage(1);
          bullet.canRemove = true;
          explosion.show({ x: bullet.x, y: bullet.y });
        }
      });

      bosses.forEach((boss) => {
        if (collisionDetection(boss.hitbox, bullet.hitbox)) {
          boss.takeDamage(1);
          bullet.canRemove = true;
          explosion.show({ x: bullet.x, y: bullet.y });
        }
      });

      if (bullet.y < -bullet.height || bullet.canRemove) {
        this.bullets.splice(index, 1);
      }
      // console.log(this.bullets);
    });
  }
}
