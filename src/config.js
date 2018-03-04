import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  localStorageName: 'attraction-wars',
  worldBounds: [0, 0, 20000, 20000],
  keyPressDv: 0.05,
  releaseDv: 0.075,
};
