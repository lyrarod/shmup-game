import { Boss, Boss1, Boss2, Boss3, Boss4 } from "./boss.js";

const waves = [
  {
    id: "wave-01",
    audio: "overworld.ogg",
    enemy: {
      qty: 3,
      energy: 3,
      sprite: {
        width: 64,
        height: 64,
        src: "Ship1.png",
      },
      delay: 1000,
      complete: false,
    },
    boss: {
      type: Boss,
      energy: 3,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    id: "wave-02",
    audio: "battle-against-machine.mp3",
    enemy: {
      qty: 5,
      energy: 5,
      sprite: {
        width: 128,
        height: 128,
        src: "Ship2.png",
      },
      delay: 1000,
      complete: false,
    },
    boss: {
      type: Boss1,
      energy: 5,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    id: "wave-03",
    audio: "KOF2k-Heroes-Team.ogg",
    enemy: {
      qty: 7,
      energy: 7,
      sprite: {
        width: 128,
        height: 128,
        src: "Ship3.png",
      },
      delay: 1000,
      complete: false,
    },
    boss: {
      type: Boss2,
      energy: 7,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    id: "wave-04",
    audio: "kraken-of-the-sea.mp3",
    enemy: {
      qty: 9,
      energy: 9,
      sprite: {
        width: 128,
        height: 128,
        src: "Ship4.png",
      },
      delay: 1000,
      complete: false,
    },
    boss: {
      type: Boss3,
      energy: 9,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    id: "wave-05",
    audio: "Top-Gear-Las-Vegas.ogg",
    enemy: {
      qty: 10,
      energy: 10,
      sprite: {
        width: 128,
        height: 128,
        src: "Ship5.png",
      },
      delay: 1000,
      complete: false,
    },
    boss: {
      type: Boss4,
      energy: 10,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
];

export const getWaves = () => {
  return waves.map((wave) => {
    return {
      ...wave,
      enemy: { ...wave.enemy, qty: 10, energy: 3, complete: false },
      boss: { ...wave.boss, energy: 10, complete: false },
      complete: false,
    };
  });
};
