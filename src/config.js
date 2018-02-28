import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  localStorageName: 'attraction-wars',
  world_bounds: {
    start: { x: 0, y: 0 },
    end: { x: 20000, y: 20000 },
  },
};
