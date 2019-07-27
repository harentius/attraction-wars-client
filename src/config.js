import Phaser from 'phaser';

export default {
  // TODO
  serverUrl: 'http://localhost:4000',
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  localStorageName: 'attraction-wars',
  maxVisibleSize: 100,
  minVisibleSize: 30,
};
