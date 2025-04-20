import { Boss } from "./boss.js";
import { Boss1 } from "./boss1.js";
import { Boss2 } from "./boss2.js";
import { Boss3 } from "./boss3.js";
import { Boss4 } from "./boss4.js";

const waves = [
  {
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
      // ...wave,
      enemy: { ...wave.enemy, qty: 5, energy: 3, complete: true },
      boss: { ...wave.boss, energy: 10 },
      complete: wave.complete,
    };
  });
};
