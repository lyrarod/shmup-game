const waves = [
  {
    enemy: { qty: 3, energy: 1, delay: 1000, complete: false },
    boss: {
      qty: 1,
      energy: 2,
      color: "#0f0",
      width: 64,
      height: 64,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    enemy: { qty: 5, energy: 1, delay: 950, complete: false },
    boss: {
      qty: 1,
      energy: 3,
      color: "#00f",
      width: 128,
      height: 128,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    enemy: { qty: 7, energy: 1, delay: 900, complete: false },
    boss: {
      qty: 1,
      energy: 4,
      color: "#f00",
      width: 256,
      height: 256,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    enemy: { qty: 10, energy: 1, delay: 850, complete: false },
    boss: {
      qty: 1,
      energy: 5,
      color: "cyan",
      width: 256,
      height: 256,
      delay: 1000,
      complete: false,
    },
    complete: false,
  },
  {
    enemy: { qty: 15, energy: 1, delay: 800, complete: false },
    boss: {
      qty: 1,
      energy: 6,
      color: "crimson",
      width: 256,
      height: 256,
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
      enemy: { ...wave.enemy },
      boss: { ...wave.boss },
      complete: wave.complete,
    };
  });
};
