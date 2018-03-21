import Phaser from 'phaser';
import config from '../../config';
import Player from '../player/Player';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = new Player(this);
    this.cursors = null;
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    this.add.tileSprite(config.worldBounds[0], config.worldBounds[1], 2 * config.worldBounds[2], 2 * config.worldBounds[3], 'background');
    this.cursors = this.input.keyboard.createCursorKeys();

    this.player.spawn(this._getStorage().playerData);

    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.setBounds(...config.worldBounds, true, true, true, true);
    this.cameras.main.startFollow(this.player.circle);
  }

  update() {
    this.player.redraw();
  }

  _getStorage() {
    return this.sys.game.storage;
  }
}
