import { Boss, Boss1, Boss2, Boss3, Boss4 } from "./boss.js";
import { Enemy, Enemy1, Enemy2, Enemy3, Enemy4 } from "./enemy.js";

const waves = [
  {
    id: "wave-01",
    audio: {
      file: "overworld.ogg",
      volume: 0.5,
    },
    enemy: {
      type: [Enemy],
      qty: 3,
      delay: 500,
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
    audio: {
      file: "battle-against-machine.mp3",
      volume: 1,
    },
    enemy: {
      type: [Enemy, ...Array(2).fill(Enemy1)],
      qty: 5,
      delay: 500,
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
    audio: {
      file: "KOF2k-Heroes-Team.ogg",
      volume: 0.3,
    },
    enemy: {
      type: [Enemy, Enemy1, ...Array(2).fill(Enemy2)],
      qty: 7,
      delay: 500,
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
    audio: {
      file: "kraken-of-the-sea.mp3",
      volume: 1,
    },
    enemy: {
      type: [Enemy, Enemy1, Enemy2, ...Array(3).fill(Enemy3)],
      qty: 9,
      delay: 500,
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
    audio: {
      file: "Top-Gear-Las-Vegas.ogg",
      volume: 0.5,
    },
    enemy: {
      type: [Enemy, Enemy1, Enemy2, Enemy3, ...Array(4).fill(Enemy4)],
      qty: 10,
      delay: 500,
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
      audio: { ...wave.audio, volume: 0.25 },
      enemy: {
        ...wave.enemy,
        // type: [Enemy4],
        qty: 100,
        complete: false,
      },
      boss: { ...wave.boss, energy: 10, complete: false },
      complete: false,
    };
  });
};
