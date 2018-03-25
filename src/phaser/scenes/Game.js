import Phaser from 'phaser';
import config from '../../config';
import Player from '../player/Player';
import KeysPressState from '../../client/KeysPressState';

export default class extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = new Player(this);
    this.previousKeysPressState = new KeysPressState();
    this.keysPressState = new KeysPressState();
    this.cursors = null;
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    const storage = this._getStorage();
    const { playerData, worldBounds } = storage.worldData;

    this.add.tileSprite(worldBounds[0], worldBounds[1], 2 * worldBounds[2], 2 * worldBounds[3], 'background');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player.spawn(playerData);

    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.setBounds(...worldBounds, true, true, true, true);
    this.cameras.main.startFollow(this.player.circle);
  }

  update() {
    this.player.redraw();
    this._handleInput();
  }

  _handleInput() {
    Object.assign(this.previousKeysPressState, this.keysPressState);

    this.keysPressState.up = this.cursors.up.isDown;
    this.keysPressState.down = this.cursors.down.isDown;
    this.keysPressState.left = this.cursors.left.isDown;
    this.keysPressState.right = this.cursors.right.isDown;

    if (!this.keysPressState.isEqual(this.previousKeysPressState)) {
      this._getClient().sendKeysPressState(this.keysPressState);
    }
  }

  _getStorage() {
    return this.sys.game.storage;
  }

  _getClient() {
    return this.sys.game.client;
  }
}
