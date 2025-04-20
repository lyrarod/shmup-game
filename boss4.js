export class Boss4 {
  constructor(game) {
    this.game = game;
    this.width = 600;
    this.height = 600;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = 0;
    this.energy = this.game.waves[this.game.waveIndex].boss["energy"];
    this.maxEnergy = this.energy;
    this.sprite = new Image();
    this.sprite.src = `./assets/ship/boss/ship_176.png`;

    this.hitbox = {
      width: 0,
      height: 0,
      x: null,
      y: null,
    };
  }

  takeDamage(damage) {
    this.energy -= damage;
    this.y -= this.height * 0.005;
    if (this.energy < 1) {
      this.game.score += damage;
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

    if (this.game.debug === true) {
      this.game.ctx.strokeStyle = "#fff";
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);

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
    this.game.bosses.forEach((boss, index) => {
      boss.render();
      boss.hitbox.width = 100;
      boss.hitbox.height = 100;
      boss.hitbox.x = boss.x + boss.width * 0.5 - boss.hitbox.width * 0.5;
      boss.hitbox.y =
        boss.y + boss.height * 0.5 - boss.hitbox.height * 0.5 - 60;

      if (boss.energy < 1) {
        this.game.bosses.splice(index, 1);
      }

      if (this.game.collisionDetection(boss.hitbox, this.game.player)) {
        this.game.player.takeDamage(1);
        return null;
      }

      if (this.game.bosses.length === 0) {
        this.game.waves[this.game.waveIndex].complete = true;
        this.game.waves[this.game.waveIndex].boss["complete"] = true;
        // console.clear();
        console.log(
          `Wave ${this.game.waveIndex + 1} completed!`,
          `You have ${
            this.game.waves.length - this.game.waveIndex - 1
          } waves left.`
        );
        return null;
      }
    });
  }
}
