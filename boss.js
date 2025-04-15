export class Boss {
  constructor(game) {
    this.game = game;
    this.width = game.waves[this.game.waveIndex].boss["width"];
    this.height = game.waves[this.game.waveIndex].boss["height"];
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = 100;
    this.color = this.game.waves[this.game.waveIndex].boss["color"];
    this.energy = this.game.waves[this.game.waveIndex].boss["energy"];
    this.maxEnergy = this.energy;
    this.bosses = [];
  }

  takeDamage(damage) {
    this.energy -= damage;
    this.y -= this.height * 0.1;
    if (this.energy < 1) {
      this.game.score += damage;
      this.game.scoreHud.innerText = Number(this.game.score.toFixed(1));
    }
  }

  render() {
    this.game.ctx.fillStyle = this.color;
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);

    if (this.game.debug === true) {
      this.game.ctx.strokeStyle = "#f00";
      this.game.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  update(deltaTime) {
    this.bosses.forEach((boss, index) => {
      boss.render();

      if (boss.energy < 1) {
        this.bosses.splice(index, 1);
      }

      if (this.game.collisionDetection(boss, this.game.player)) {
        this.game.player.takeDamage(1);
        return null;
      }

      if (this.bosses.length === 0) {
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
