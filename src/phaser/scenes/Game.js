import Phaser from 'phaser';
import config from '../../config';
import Player from '../player/Player';
import KeysPressState from '../../client/KeysPressState';

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = new Player(this);
    this.otherPlayers = new Map();
    this.previousKeysPressState = new KeysPressState();
    this.keysPressState = new KeysPressState();
    this.cursors = null;
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    const storage = this._getStorage();
    const { worldBounds } = storage.worldData;

    this.add.tileSprite(worldBounds[0], worldBounds[1], 2 * worldBounds[2], 2 * worldBounds[3], 'background');
    this.cursors = this.input.keyboard.createCursorKeys();

    for (const playerData of Object.values(this._getStorage().worldData.playersData)) {
      if (storage.playerData.id === playerData.id) {
        continue;
      }

      const player = new Player(this);
      this.otherPlayers.set(playerData.id, player);
      player.spawn(playerData);
    }

    this.player.spawn(storage.playerData);

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

export default Game;
