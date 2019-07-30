import Phaser from 'phaser';

export default {
  // TODO
  serverUrl: 'http://localhost:4000',
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  localStorageName: 'attraction-wars',
  maxVisibleSize: 120,
  minVisibleSize: 30,
  minZoom: 0.4,
  maxZoom: 1.4,
  zoomChange: 0.2,
};
