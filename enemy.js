export class Enemy {
  constructor(game) {
    this.game = game;
    this.size = 64;
    this.width = this.size;
    this.height = this.size;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = -this.height;
    this.dx = Math.random() < 0.33 ? -0.2 : Math.random() < 0.66 ? 0.2 : 0;
    this.speed = 0.2 + Math.random();
    this.energy = 1;
    this.maxEnergy = this.energy;
    this.hitbox = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };

    this.sprite = new Image();
    this.sprite.src = `./assets/ship/Ship1.png`;

    this.exhaust = {
      width: 32,
      height: 32,
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
    this.exhaust.sprite.src = "./assets/ship/ship1_exhaust.png";
  }

  takeDamage(damage) {
    if (this.y < 0) return;
    this.energy -= damage;
    this.y -= this.height * 0.05;
    if (this.energy < 1) {
      this.game.score += damage * 0.1;
      this.game.scoreHud.innerText = Number(this.game.score.toFixed(1));
    }
  }

  drawEnemy() {
    this.game.ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.y += this.speed;
    this.x += this.speed * this.dx;

    this.drawExhaust();
  }

  drawExhaust() {
    this.exhaust.x = this.x + this.width * 0.5 - this.exhaust.width * 0.5;
    this.exhaust.y = this.y - this.exhaust.height * 0.82;

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
  }

  enemyDebug() {
    if (this.game.debug === true) {
      // Enemy
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

      // Exhaust
      this.game.ctx.strokeStyle = "#fff";
      this.game.ctx.strokeRect(
        this.exhaust.x,
        this.exhaust.y,
        this.exhaust.width,
        this.exhaust.height
      );

      this.game.ctx.fillStyle = "lightgray";
      this.game.ctx.fillRect(this.x, this.y - 10, this.width, 7);

      this.game.ctx.fillStyle = "#ff0";
      if (this.energy <= this.maxEnergy * 0.1 || this.energy <= 1) {
        this.game.ctx.fillStyle = "#f00";
      }
      for (let i = 0; i < this.energy; i++) {
        this.game.ctx.fillRect(this.x + i * 3, this.y - 10, 5, 7);
      }
    }
  }

  enemyHitbox() {
    this.hitbox.width = 25;
    this.hitbox.height = 40;
    this.hitbox.x = this.x + this.width * 0.5 - this.hitbox.width * 0.5;
    this.hitbox.y = this.y + this.height * 0.5 - this.hitbox.height * 0.5 + 4;
  }

  render(deltaTime) {
    this.drawEnemy();
    this.enemyHitbox();
    this.enemyDebug();

    if (this.exhaust.frameTimer > this.exhaust.frameInterval) {
      this.exhaust.indexFrameX++;
      if (this.exhaust.indexFrameX >= this.exhaust.frameX.length) {
        this.exhaust.indexFrameX = 0;
      }
      this.exhaust.frameTimer = 0;
    } else {
      this.exhaust.frameTimer += deltaTime;
    }
  }

  update(deltaTime) {
    const { enemies, player, collisionDetection, waves, waveIndex } = this.game;

    enemies.forEach((enemy, index) => {
      enemy.render(deltaTime);

      if (
        enemy.hitbox.x < 0 ||
        enemy.hitbox.x + enemy.hitbox.width > this.game.width
      ) {
        enemy.dx *= -1;
      }

      if (enemy.y > this.game.height) {
        enemy.y = -enemy.height;
        enemy.x = Math.random() * (this.game.width - enemy.width);
        enemy.dx === 0 ? (enemy.dx = Math.random() < 0.5 ? -1 : 1) : null;
        enemy.dx *=
          Math.random() < 0.33 ? -0.25 : Math.random() < 0.66 ? 0.25 : 0;
        enemy.speed += 0.1;
      }

      if (collisionDetection(enemy.hitbox, player.hitBox)) {
        player.takeDamage(1);
        enemies.splice(index, 1);
      }

      if (enemy.energy < 1) {
        enemies.splice(index, 1);
      }
      // console.log(enemies);

      if (enemies.length === 0) {
        waves[waveIndex].enemy.complete = true;
      }
    });
  }
}

export class Enemy1 extends Enemy {
  constructor(game) {
    super(game);
    this.size = 128;
    this.width = this.size;
    this.height = this.size;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = -this.height;
    this.speed = 0.21 + Math.random();
    this.energy = 2;
    this.maxEnergy = this.energy;
    this.sprite.src = `./assets/ship/Ship2.png`;
    this.exhaust.sprite.src = `./assets/ship/ship2_exhaust.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  drawExhaust() {
    this.exhaust.x = this.x + this.width * 0.5 - this.exhaust.width * 0.5;
    this.exhaust.y = this.y - this.exhaust.height * 0.1;

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
  }

  render(deltaTime) {
    super.render(deltaTime);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class Enemy2 extends Enemy1 {
  constructor(game) {
    super(game);
    this.speed = 0.22 + Math.random();
    this.energy = 3;
    this.maxEnergy = this.energy;
    this.sprite.src = `./assets/ship/Ship3.png`;
    this.exhaust.sprite.src = `./assets/ship/ship3_exhaust.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  drawExhaust() {
    this.exhaust.x = this.x + this.width * 0.5 - this.exhaust.width * 0.5;
    this.exhaust.y = this.y - this.exhaust.height * 0.2;

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
  }

  render(deltaTime) {
    super.render(deltaTime);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class Enemy3 extends Enemy1 {
  constructor(game) {
    super(game);
    this.speed = 0.23 + Math.random();
    this.energy = 4;
    this.maxEnergy = this.energy;
    this.sprite.src = `./assets/ship/Ship4.png`;
    this.exhaust.sprite.src = `./assets/ship/ship4_exhaust.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  drawExhaust() {
    this.exhaust.x = this.x + this.width * 0.5 - this.exhaust.width * 0.55;
    this.exhaust.y = this.y - this.exhaust.height * 0.5;

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
  }

  enemyHitbox() {
    this.hitbox.width = 30;
    this.hitbox.height = 60;
    this.hitbox.x = this.x + this.width * 0.5 - this.hitbox.width * 0.5;
    this.hitbox.y = this.y + this.height * 0.5 - this.hitbox.height * 0.5;
  }

  render(deltaTime) {
    super.render(deltaTime);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class Enemy4 extends Enemy1 {
  constructor(game) {
    super(game);
    this.speed = 0.24 + Math.random();
    this.energy = 5;
    this.maxEnergy = this.energy;
    this.sprite.src = `./assets/ship/Ship5.png`;
    this.exhaust.sprite.src = `./assets/ship/ship5_exhaust.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  drawExhaust() {
    this.exhaust.x = this.x + this.width * 0.5 - this.exhaust.width * 0.72;
    this.exhaust.y = this.y - this.exhaust.height * 0.6;

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
  }

  enemyHitbox() {
    this.hitbox.width = 35;
    this.hitbox.height = 70;
    this.hitbox.x = this.x + this.width * 0.5 - this.hitbox.width * 0.5 - 5;
    this.hitbox.y = this.y + this.height * 0.5 - this.hitbox.height * 0.5;
  }

  render(deltaTime) {
    super.render(deltaTime);
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}
