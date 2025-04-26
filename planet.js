export class Planet {
  constructor(
    game,
    config = {
      width: null,
      height: null,
      position: { x: null, y: null },
      sprite: null,
      frameX: null,
      frameInterval: null,
      maxFrameY: null,
      speed: null,
    }
  ) {
    this.game = game;

    this.width = config.width ?? 256;
    this.height = config.height ?? 256;
    this.x = null;
    this.y = null;
    this.frameX = Array.isArray(config.frameX)
      ? config.frameX
      : Array.from({ length: config.frameX }, (_, index) => index);
    this.indexFrameX = 0;
    this.frameY = 0;
    this.maxFrameY = config.maxFrameY ?? 0;
    this.sprite = new Image();
    this.frameTimer = 0;
    this.frameInterval = config.frameInterval ?? 1000 / 60;
    this.speed = config.speed ?? 0;
    this.directionX = Math.random() < 0.5 ? -1 : 1;

    this.sprite.src = `./assets/planet/${
      config.sprite ?? "Terrestrial_01-512x512.png"
    }`;

    this.position = {
      x: config.position?.x ?? 0,
      y: config.position?.y ?? 0,
    };

    this.planets = [];
  }

  create() {
    this.planets = [];

    this.planets.push(
      new Planet(this.game, {
        sprite: "Terrestrial_01-512x512.png",
        width: 512,
        height: 512,
        position: {
          x: this.game.width - 512 * 0.8,
          y: this.game.height - 512 * 0.5,
        },
        frameX: 1,
      })
    );
    // console.log(this.planets);
  }

  render() {
    this.game.ctx.drawImage(
      this.sprite,
      this.frameX.at(this.indexFrameX) * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      (this.x = this.position.x),
      (this.y = this.position.y),
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    this.planets.forEach((planet) => {
      planet.render();
      planet.position.y += planet.speed;

      if (planet.position.y > this.game.height) {
        planet.position.y = -planet.height;
        planet.position.x =
          Math.random() * (this.game.width - planet.width * 0.5);
      }

      if (planet.frameTimer >= planet.frameInterval) {
        planet.indexFrameX++;
        if (planet.indexFrameX >= planet.frameX.length) {
          planet.indexFrameX = 0;

          planet.frameY >= planet.maxFrameY
            ? (planet.frameY = 0)
            : planet.frameY++;
        }

        planet.frameTimer = 0;
      } else {
        planet.frameTimer += deltaTime;
      }
    });
  }
}
