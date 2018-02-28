import Phaser from 'phaser';
import config from '../config';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    this.add.tileSprite(0, 0, config.world_bounds.end.x, config.world_bounds.end.y, 'background');
  }

  update() {

  }
}
