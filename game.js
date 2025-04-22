import { Player } from "./player.js";
import { Bullet } from "./bullet.js";
import { Enemy } from "./enemy.js";
import { Boss } from "./boss.js";
import { Planet } from "./planet.js";
import { getWaves } from "./waves.js";
import { Keyboard } from "./keyboard.js";

export class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = 768;
    this.height = this.canvas.height = 1016;

    this.waves = [];
    this.waveIndex = 0;
    this.startWaves();

    this.player = new Player(this);
    this.bullet = new Bullet(this);
    this.enemy = new Enemy(this);

    this.boss = new Boss(this);
    this.planet = new Planet(this);
    this.keyboard = new Keyboard(this);

    this.gameObjects = [
      this.planet,
      this.bullet,
      this.enemy,
      this.player,
      this.boss,
    ];

    this.bosses = [];

    this.background = {
      x: 0,
      y: 0,
      width: this.width,
      height: 1016,
      image: new Image(),
      speed: 0.5,
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

    this.musics = [
      {
        title: "The Legend of Zelda: A Link to the Past - Overworld",
        audio: new Audio("./assets/audio/Overworld.ogg"),
        volume: 0.25,
      },
      {
        title: "Ryu's Theme",
        audio: new Audio("./assets/audio/Ryu-Theme.ogg"),
        volume: 0.25,
      },
      {
        title: "Top Gear: Las Vegas",
        audio: new Audio("./assets/audio/Top-Gear-Las-Vegas.ogg"),
        volume: 0.25,
      },
      {
        title: "The King of Fighters 2000: Heroes Team",
        audio: new Audio("./assets/audio/KOF2k-Heroes-Team.ogg"),
        volume: 0.25,
      },
      {
        title: "Theme of Super Metroid",
        audio: new Audio("./assets/audio/Theme-of-Super-Metroid.ogg"),
        volume: 0.35,
      },
    ];

    this.musicsIndex = null;
    this.currentMusic = null;

    this.musics.map((music, i) => {
      music.audio.addEventListener("play", () => {
        console.log(music);
      });

      music.audio.addEventListener("ended", () => {
        this.musicsIndex = i < this.musics.length - 1 ? i + 1 : 0;
        this.currentMusic = this.musics.at(this.musicsIndex);
        this.currentMusic.audio.currentTime = 0;
        this.currentMusic.audio.volume = this.currentMusic.volume;
        this.currentMusic.audio.play();
      });
    });

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

    this.musics.at(this.musicsIndex).audio.play();

    if (
      this.paused === true &&
      this.player.lives >= 0 &&
      this.waves.at(-1).complete === false
    ) {
      this.musics.at(this.musicsIndex).audio.pause();
      pause.innerText = "▶";
      pauseScreen.style.visibility = "visible";
      document.querySelector("#pauseScreen h1").style.transform = "scale(1)";
    }
    // console.log("paused:", this.paused);
  }

  update(deltaTime) {
    this.backgroundRender(deltaTime);

    if (
      this.enemy.enemies.length === 0 &&
      this.waveIndex < this.waves.length &&
      this.waves.at(this.waveIndex).enemy["complete"] === false
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
      this.waves.at(this.waveIndex).boss["complete"] === false &&
      this.waves.at(this.waveIndex).enemy["complete"] === true
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
      this.musics.at(this.musicsIndex).audio.pause();
      alert("Game Over!");
      return null;
    }

    this.update(deltaTime);

    if (this.waves.at(-1).complete === false) {
      this.raf = requestAnimationFrame(this.loop);
    } else {
      console.log("Waves completed!");
      this.running = false;
      this.musics.at(this.musicsIndex).audio.pause();

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
      this.enemy.enemies.push(new Enemy(this));
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

    this.background.y += this.background.speed;
    if (this.background.y >= this.height) {
      this.background.y = 0;
    }
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

  start() {
    this.running = true;
    this.gameOver = false;
    this.player.reset();
    this.startHud();
    this.startWaves();
    this.planet.create();
    this.enemy.enemies = [];
    this.bullet.bullets = [];
    this.bosses = [];
    this.background.y = 0;
    this.background.frameTimer = 0;

    this.musicsIndex = Math.floor(Math.random() * this.musics.length);
    this.currentMusic = this.musics.at(this.musicsIndex);
    this.currentMusic.audio.currentTime = 0;
    this.currentMusic.audio.volume = this.currentMusic.volume;
    this.currentMusic.audio.play();

    this.raf = requestAnimationFrame(this.loop);
  }
}
