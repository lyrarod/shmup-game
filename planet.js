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
    }
  ) {
    this.game = game;

    this.width = config.width ?? 256;
    this.height = config.height ?? 256;
    this.x = null;
    this.y = null;
    this.frameX = Array.from(
      { length: config.frameX ?? 50 },
      (_, index) => index
    );
    this.indexFrameX = 0;
    this.frameY = 0;
    this.maxFrameY = 0;
    this.sprite = new Image();
    this.frameTimer = 0;
    this.frameInterval = config.frameInterval ?? 1000 / 60;
    this.speed = 0.025;
    this.directionX = Math.random() < 0.5 ? -1 : 1;

    this.sprite.src = `./assets/planets/${config.sprite ?? "planet.png"}`;

    this.position = {
      x: config.position?.x ?? 0,
      y: config.position?.y ?? 0,
    };

    this.planets = [];
  }

  add(planet) {
    this.planets.push(planet);
  }

  create() {
    this.planets = [];

    this.add(
      new Planet(this.game, {
        sprite: "spritesheet.png",
        width: 512,
        height: 512,
        position: {
          x: this.game.width - 512 * 0.6,
          y: -512 * 0.45,
        },
        frameX: 1,
      })
    );

    this.add(
      new Planet(this.game, {
        sprite: "Earth-128x128.png",
        width: 128,
        height: 128,
        position: {
          x: this.game.width * 0.5 - 128 * 0.5,
          y: 200,
        },
        frameX: 6,
        frameInterval: 20000,
      })
    );

    this.add(
      new Planet(this.game, {
        sprite: "galaxy.png",
        width: 300,
        height: 300,
        position: {
          x: -60,
          y: this.game.height - 270,
        },
        frameInterval: 60,
      })
    );

    // this.add(
    //   new Planet(this.game, {
    //     sprite: "black_hole.png",
    //     width: 326,
    //     height: 326,
    //     position: {
    //       x: this.game.width * 0.5 - this.width * 0.5 - 50,
    //       y: this.game.height * 0.5 - this.height * 0.5 - 100,
    //     },
    //     frameInterval: 120,
    //   })
    // );

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
      planet.render(deltaTime);

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
