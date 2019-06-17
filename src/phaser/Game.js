import Phaser from 'phaser';
import BootScene from './scenes/Boot';
import SpaceScene from './scenes/Space';
import config from '../config';

const gameConfig = Object.assign(config, {
  scene: [BootScene, SpaceScene],
});

class Game extends Phaser.Game {
  constructor(storage, client) {
    super(gameConfig);
    this.storage = storage;
    this.client = client;
  }
}

export default Game;
