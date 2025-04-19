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
      complete: true,
    },
    boss: {
      qty: 1,
      energy: 3,
      sprite: {
        width: 600,
        height: 600,
        src: "ship_41.png",
      },
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
      complete: true,
    },
    boss: {
      qty: 1,
      energy: 5,
      sprite: {
        width: 600,
        height: 600,
        src: "ship_44.png",
      },
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
      complete: true,
    },
    boss: {
      qty: 1,
      energy: 7,
      sprite: {
        width: 600,
        height: 600,
        src: "ship_48.png",
      },
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
      complete: true,
    },
    boss: {
      qty: 1,
      energy: 9,
      sprite: {
        width: 600,
        height: 600,
        src: "ship_49.png",
      },
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
      complete: true,
    },
    boss: {
      qty: 1,
      energy: 10,
      sprite: {
        width: 600,
        height: 600,
        src: "ship_176.png",
      },
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
