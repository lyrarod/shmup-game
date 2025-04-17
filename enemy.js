export class Enemy {
  constructor(game) {
    this.game = game;
    this.width = 64;
    this.height = 64;
    this.x = Math.random() * (this.game.width - this.width);
    this.y = -this.height;
    this.dx = Math.random() < 0.33 ? -0.2 : Math.random() < 0.66 ? 0.2 : 0;
    this.speed = 0.2 + Math.random();
    // this.colors = ["#f00", "#0f0", "#00f"];
    // this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.color = this.game.waves.at(this.game.waveIndex).boss["color"];
    this.enemies = [];
    this.energy = this.game.waves.at(this.game.waveIndex).enemy["energy"];
    this.maxEnergy = this.energy;
    this.hitbox = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    };

    this.sprite = new Image();
    this.sprite.src = "./assets/ship/Ship1.png";
  }

  takeDamage(damage) {
    this.energy -= damage;
    this.y -= this.height * 0.1;
    if (this.energy < 1) {
      this.game.score += damage * 0.1;
      this.game.scoreHud.innerText = Number(this.game.score.toFixed(1));
    }
  }

  render() {
    this.game.ctx.drawImage(
      this.sprite,
      this.x,
      this.y,
      this.width,
      this.height
    );

    this.game.ctx.fillStyle = "lightgray";
    this.game.ctx.fillRect(this.x, this.y - 10, this.width, 5);

    this.game.ctx.fillStyle = "#ff0";
    if (this.energy <= this.maxEnergy * 0.1 || this.energy <= 1) {
      this.game.ctx.fillStyle = "#f00";
    }
    for (let i = 0; i < this.energy; i++) {
      this.game.ctx.fillRect(this.x + i * 3, this.y - 10, 5, 5);
    }

    if (this.game.debug === true) {
      this.game.ctx.strokeStyle = "#f00";
      this.game.ctx.strokeRect(
        this.hitbox.x,
        this.hitbox.y,
        this.hitbox.width,
        this.hitbox.height
      );
    }
  }

  update(deltaTime) {
    this.enemies.forEach((enemy, index) => {
      enemy.render();
      enemy.x += enemy.speed * enemy.dx;
      enemy.y += enemy.speed;

      enemy.hitbox.width = 64;
      enemy.hitbox.height = 64;
      enemy.hitbox.x = enemy.x;
      enemy.hitbox.y = enemy.y;

      if (enemy.x < 0 || enemy.x + enemy.width > this.game.width) {
        enemy.dx *= -1;
      }

      if (enemy.energy < 1 || enemy.y > this.game.height) {
        this.enemies.splice(index, 1);
      }

      if (this.game.collisionDetection(this.game.player, enemy)) {
        this.game.player.takeDamage(1);
        this.enemies.splice(index, 1);
      }

      // console.log(this.enemies);

      if (this.enemies.length === 0) {
        this.game.waves[this.game.waveIndex].enemy["complete"] = true;
        // console.clear();
      }
    });
  }
}
