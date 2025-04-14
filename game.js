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
    this.resetWaves();

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
      this.boss,
      this.player,
    ];

    this.background = {
      x: 0,
      y: 0,
      width: this.width,
      height: 1600,
      image: new Image(),
      speed: 0.5,
      frameTimer: 0,
      frameInterval: 1000 / 60,
    };
    this.background.image.src =
      "./assets/T_PurpleBackground_Version2_Layer4.png";

    this.score = 0;
    this.raf = null;
    this.debug = false;
    this.paused = false;
    this.running = false;
    this.gameOver = false;
    this.frame = 0;
    this.lastTime = 0;

    this.sounds = {
      shoot: new Audio("./assets/audio/LASRGun_Classic_Blaster_A_Fire_03.ogg"),
    };

    this.musics = [
      {
        title: "v1.0-full-song",
        audio: new Audio("./assets/audio/v1.0-full-song.ogg"),
        volume: 0.25,
      },
      {
        title: "Brinstar Overgrown with Vegetation Area",
        audio: new Audio(
          "./assets/audio/05.-Brinstar-Overgrown-with-Vegetation-Area.ogg"
        ),
        volume: 0.5,
      },
      {
        title: "Theme of Samus Aran - Galactic Warrior",
        audio: new Audio(
          "./assets/audio/08.-Theme-of-Samus-Aran-_-Galactic-Warrior.ogg"
        ),
        volume: 0.5,
      },
      {
        title: "Theme of Super Metroid",
        audio: new Audio("./assets/audio/02.-Theme-of-Super-Metroid.ogg"),
        volume: 0.5,
      },
    ];

    this.musicIndex = null;
    this.currentMusic = null;

    this.musics.map((music, i) => {
      music.audio.addEventListener("play", () => {
        console.clear();
        console.log(music);
      });

      music.audio.addEventListener("ended", () => {
        this.musicIndex = i < this.musics.length - 1 ? i + 1 : 0;
        const currentMusic = this.musics.at(this.musicIndex);
        currentMusic.audio.currentTime = 0;
        currentMusic.audio.volume = currentMusic.volume;
        currentMusic.audio.play();
      });
    });

    this.scoreHud = document.getElementById("score");
    this.waveHud = document.getElementById("wave");
    this.wavesHud = document.getElementById("waves");
    this.livesHud = document.getElementById("lives");

    this.resetHud();
  }

  resetHud() {
    this.scoreHud.innerText = this.score;
    this.waveHud.innerText = this.waveIndex + 1;
    this.wavesHud.innerText = this.waves.length;
    this.livesHud.innerText = this.player.lives;
  }

  togglePause() {
    if (this.running === false || this.gameOver === true) return;

    this.paused = !this.paused;
    pause.innerText = "❚❚";
    pauseScreen.style.visibility = "hidden";
    document.querySelector("#pauseScreen h1").style.transform = "scale(0)";

    this.musics.at(this.musicIndex).audio.play();

    if (
      this.paused === true &&
      this.player.lives >= 0 &&
      this.waves.at(-1).complete === false
    ) {
      this.musics.at(this.musicIndex).audio.pause();
      pause.innerText = "▶";
      pauseScreen.style.visibility = "visible";
      document.querySelector("#pauseScreen h1").style.transform = "scale(1)";
    }
    // console.log("paused:", this.paused);
  }

  update(deltaTime) {
    // this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    // this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.backgroundRender(deltaTime);

    if (
      this.enemy.enemies.length === 0 &&
      this.waveIndex < this.waves.length &&
      this.waves.at(this.waveIndex).enemy["complete"] === false
    ) {
      this.frame++;
      // console.log("frame:", this.frame);

      if (this.frame >= 120) {
        this.spawnEnemies();
        this.frame = 0;
      }
    }

    if (
      this.boss.bosses.length === 0 &&
      this.waveIndex < this.waves.length &&
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

    if (this.paused) {
      return (this.raf = requestAnimationFrame(this.loop));
    }
    // console.log("deltaTime:", Math.floor(deltaTime));

    if (this.player.lives < 0) {
      this.running = false;
      this.gameOver = true;
      this.musics.at(this.musicIndex).audio.pause();
      alert("Game Over!");
      return null;
    }

    this.update(deltaTime);

    if (this.waves.at(-1).complete === false) {
      this.raf = requestAnimationFrame(this.loop);
    } else {
      console.log("Waves completed!");
      this.running = false;
      this.musics.at(this.musicIndex).audio.pause();

      let confirm = window.confirm("Waves completed! Play again?");
      if (confirm) {
        this.score = 0;
        this.resetWaves();
        this.player.reset();
        this.resetHud();
        this.bullet.bullets = [];
        this.enemy.enemies = [];
        this.boss.bosses = [];
        this.background.y = 0;
        this.background.frameTimer = 0;

        this.start();
      }
    }
  };

  backgroundRender(deltaTime) {
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

    if (this.background.frameTimer > this.background.frameInterval) {
      this.background.y += this.background.speed;
      if (this.background.y >= this.height) {
        this.background.y = 0;
      }
      this.background.frameTimer = 0;
    } else {
      this.background.frameTimer += deltaTime;
    }
  }

  async spawnEnemies() {
    const qty = this.waves.at(this.waveIndex).enemy["qty"];
    const delay = this.waves.at(this.waveIndex).enemy["delay"];
    for (let i = 0; i < qty; i++) {
      this.enemy.enemies.push(new Enemy(this));
      await this.delay(delay);
    }
  }

  async spawnBoss() {
    const qty = this.waves.at(this.waveIndex).boss["qty"];
    const delay = this.waves.at(this.waveIndex).boss["delay"];
    for (let i = 0; i < qty; i++) {
      this.boss.bosses.push(new Boss(this));
      await this.delay(delay);
    }
  }

  resetWaves() {
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
    this.planet.create();

    this.musicIndex = Math.floor(Math.random() * this.musics.length);
    this.currentMusic = this.musics.at(this.musicIndex);
    this.currentMusic.audio.currentTime = 0;
    this.currentMusic.audio.volume = this.currentMusic.volume;
    this.currentMusic.audio.play();

    this.raf = requestAnimationFrame(this.loop);
  }
}
