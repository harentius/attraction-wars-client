import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  localStorageName: 'attraction-wars',
  world_bounds: [0, 0, 20000, 20000],
};
