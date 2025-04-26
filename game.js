import { Player } from "./player.js";
import { Bullet } from "./bullet.js";
import { Enemy } from "./enemy.js";
import { Boss } from "./boss.js";
import { Planet } from "./planet.js";
import { getWaves } from "./waves.js";
import { Keyboard } from "./keyboard.js";
import { Explosion } from "./explosion.js";

export class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = 768;
    this.height = this.canvas.height = 1024;

    this.waves = [];
    this.waveIndex = 0;
    this.startWaves();

    this.player = new Player(this);
    this.bullet = new Bullet(this);
    this.enemy = new Enemy(this);
    this.boss = new Boss(this);
    this.planet = new Planet(this);
    this.explosion = new Explosion(this);
    this.keyboard = new Keyboard(this);

    this.gameObjects = [
      this.planet,
      this.enemy,
      this.boss,
      this.bullet,
      this.explosion,
      this.player,
    ];

    this.bosses = [];
    this.enemies = [];

    this.background = {
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      image: new Image(),
      speed: 1,
    };
    this.background.image.src = "./assets/bg/Stars-Big_1_2_PC.png";

    this.score = 0;
    this.raf = null;
    this.debug = false;
    this.paused = false;
    this.running = false;
    this.gameOver = false;
    this.frame = 0;
    this.lastTime = 0;

    this.audio = new Audio();

    this.scoreHud = document.getElementById("score");
    this.waveHud = document.getElementById("wave");
    this.wavesHud = document.getElementById("waves");
    this.livesHud = document.getElementById("lives");

    this.startHud();
  }

  startHud() {
    this.scoreHud.innerText = this.score = 0;
    this.waveHud.innerText = this.waveIndex = 0 + 1;
    this.wavesHud.innerText = this.waves.length;
    this.livesHud.innerText = this.player.lives;
  }

  togglePause() {
    if (this.running === false || this.gameOver === true) return;

    this.paused = !this.paused;
    pause.innerText = "❚❚";
    pauseScreen.style.visibility = "hidden";
    document.querySelector("#pauseScreen h1").style.transform = "scale(0)";
    this.audio.play();

    if (
      this.paused === true &&
      this.player.lives >= 0 &&
      this.waves.at(-1).complete === false
    ) {
      this.audio.pause();
      pause.innerText = "▶";
      pauseScreen.style.visibility = "visible";
      document.querySelector("#pauseScreen h1").style.transform = "scale(1)";
    }
    // console.log("paused:", this.paused);
  }

  update(deltaTime) {
    this.backgroundRender();

    if (
      this.enemies.length === 0 &&
      this.waveIndex < this.waves.length &&
      this.waves.at(this.waveIndex)["enemy"].complete === false
    ) {
      this.frame++;
      // console.log("frame:", this.frame);

      if (this.frame >= 160) {
        this.spawnEnemies();
        this.frame = 0;
      }
    }

    if (
      this.bosses.length === 0 &&
      this.waveIndex < this.waves.length &&
      this.waves.at(this.waveIndex).complete === false &&
      this.waves.at(this.waveIndex)["boss"].complete === false &&
      this.waves.at(this.waveIndex)["enemy"].complete === true
    ) {
      this.frame++;
      // console.log("frame:", this.frame);

      if (this.frame >= 120) {
        this.spawnBoss();
        this.frame = 0;
      }
    }

    if (
      this.waveIndex < this.waves.length &&
      this.waves.at(this.waveIndex).complete
    ) {
      this.waveIndex++;
      if (this.waveIndex <= this.waves.length - 1) {
        this.waveHud.innerText = this.waveIndex + 1;
        this.playSound();
      }
    }

    this.gameObjects.forEach((object) => object.update(deltaTime));
  }

  loop = (timeStamp = 0) => {
    let deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    if (this.paused === true) {
      return (this.raf = requestAnimationFrame(this.loop));
    }
    // console.log("deltaTime:", Math.floor(deltaTime));

    if (this.player.lives < 0) {
      this.running = false;
      this.gameOver = true;
      this.audio.pause();
      alert("Game Over!");
      return null;
    }

    this.update(deltaTime);

    if (this.waves.at(-1).complete === false) {
      this.raf = requestAnimationFrame(this.loop);
    } else {
      console.log("Waves completed!");
      this.running = false;
      this.audio.pause();

      let confirm = window.confirm("Waves completed! Play again?");
      if (confirm) {
        this.start();
      }
    }
  };

  async spawnEnemies() {
    const qty = this.waves.at(this.waveIndex).enemy["qty"];
    const delay = this.waves.at(this.waveIndex).enemy["delay"];
    for (let i = 0; i < qty; i++) {
      this.enemies.push(new Enemy(this));
      await this.delay(delay);
    }
  }

  spawnBoss() {
    const boss = this.waves.at(this.waveIndex).boss["type"];
    this.bosses.push(new boss(this));
  }

  backgroundRender() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.drawImage(
      this.background.image,
      this.background.x,
      this.background.y,
      this.background.width,
      this.background.height
    );
    this.ctx.drawImage(
      this.background.image,
      this.background.x,
      this.background.y - this.height,
      this.background.width,
      this.background.height
    );

    this.background.y >= this.height
      ? (this.background.y = 0)
      : (this.background.y += this.background.speed);
  }

  startWaves() {
    this.waveIndex = 0;
    this.waves = getWaves();
  }

  collisionDetection(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  delay(time = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  playSound() {
    const path = "./assets/audio/wave/";
    const file = this.waves.at(this.waveIndex)["audio"].file;
    let source = `${path}${file}`;
    const volume = this.waves.at(this.waveIndex)["audio"].volume;

    if (!this.audio.paused) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.audio.src = source;
    this.audio.volume = volume;
    this.audio.loop = true;
    this.audio.currentTime = 0;
    this.audio.play().catch(() => {});
  }

  start() {
    this.running = true;
    this.gameOver = false;
    this.player.reset();
    this.startHud();
    this.startWaves();
    this.planet.create();
    this.bullet.bullets = [];
    this.enemies = [];
    this.bosses = [];
    this.explosion.explosions = [];
    this.background.y = 0;
    this.background.frameTimer = 0;
    this.playSound();

    this.raf = requestAnimationFrame(this.loop);
  }
}
