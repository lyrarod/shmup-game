export class Boss {
  constructor(game) {
    this.game = game;
    this.width = 600;
    this.height = 600;
    this.x = this.game.width * 0.5 - this.width * 0.5;
    this.y = -this.height * 0.75;
    this.energy = this.game.waves[this.game.waveIndex].boss["energy"];
    this.maxEnergy = this.energy;
    this.sprite = new Image();
    this.sprite.src = `./assets/ship/boss/ship_41.png`;

    this.hitbox = {
      width: 0,
      height: 0,
      x: null,
      y: null,
    };

    this.sizebox = {
      width: 0,
      height: 0,
      x: null,
      y: null,
    };
  }

  takeDamage(damage) {
    if (this.sizebox.y < 0) return;
    this.energy -= damage;
    this.y -= this.height * 0.01;
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

      this.game.ctx.strokeStyle = "#0f0";
      this.game.ctx.strokeRect(
        this.sizebox.x,
        this.sizebox.y,
        this.sizebox.width,
        this.sizebox.height
      );
    }

    this.hitbox.width = 100;
    this.hitbox.height = 100;
    this.hitbox.x = this.x + this.width * 0.5 - this.hitbox.width * 0.5;
    this.hitbox.y = this.y + this.height * 0.5 - this.hitbox.height * 0.5 - 60;

    this.sizebox.width = 465;
    this.sizebox.height = 285;
    this.sizebox.x = this.x + this.width * 0.5 - this.sizebox.width * 0.5;
    this.sizebox.y =
      this.y + this.height * 0.5 - this.sizebox.height * 0.5 - 35;

    if (this.sizebox.y - 50 < 0) {
      this.y++;
    }
  }

  update(deltaTime) {
    this.game.bosses.forEach((boss, index) => {
      boss.render();

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

export class Boss1 extends Boss {
  constructor(game) {
    super(game);
    this.y = -this.height * 0.7;
    this.sprite.src = `./assets/ship/boss/ship_44.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  render() {
    // super.render();
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

      this.game.ctx.strokeStyle = "#0f0";
      this.game.ctx.strokeRect(
        this.sizebox.x,
        this.sizebox.y,
        this.sizebox.width,
        this.sizebox.height
      );
    }

    this.hitbox.width = 50;
    this.hitbox.height = 100;
    this.hitbox.x = this.x + this.width * 0.5 - this.hitbox.width * 0.5;
    this.hitbox.y = this.y + this.height * 0.5 - this.hitbox.height * 0.5 - 60;

    this.sizebox.width = 420;
    this.sizebox.height = 280;
    this.sizebox.x = this.x + this.width * 0.5 - this.sizebox.width * 0.5;
    this.sizebox.y =
      this.y + this.height * 0.5 - this.sizebox.height * 0.5 - 10;

    if (this.sizebox.y - 50 < 0) {
      this.y++;
    }
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class Boss2 extends Boss {
  constructor(game) {
    super(game);
    this.sprite.src = `./assets/ship/boss/ship_48.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  render() {
    super.render();
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class Boss3 extends Boss {
  constructor(game) {
    super(game);
    this.sprite.src = `./assets/ship/boss/ship_49.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  render() {
    super.render();
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class Boss4 extends Boss {
  constructor(game) {
    super(game);
    this.sprite.src = `./assets/ship/boss/ship_176.png`;
  }

  takeDamage(damage) {
    super.takeDamage(damage);
  }

  render() {
    super.render();
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}
