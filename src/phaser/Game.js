import Phaser from 'phaser';
import BootScene from './scenes/Boot';
import SpaceScene from './scenes/Space';
import config from '../config';

class Game extends Phaser.Game {
  constructor(storage, client) {
    super(Object.assign(config, {
      // TODO: tmp solution
      type: JSON.parse(window.localStorage.getItem('useWebGLRenderer')) ? Phaser.WEBGL : Phaser.CANVAS,
      scene: [BootScene, SpaceScene],
      render: {
        clearBeforeRender: false,
        powerPreference: 'high-performance',
      },
    }));
    this.storage = storage;
    this.client = client;
  }
}

export default Game;
