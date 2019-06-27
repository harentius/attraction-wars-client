import Phaser from 'phaser';
import config from '../../config';
import Player from '../player/Player';
import KeysPressState from '../../client/KeysPressState';
import Asteroid from '../asteroid/Asteroid';

class Space extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = null;
    this.otherPlayers = new Map();
    this.asteroids = new Map();
    this.previousKeysPressState = new KeysPressState();
    this.keysPressState = new KeysPressState();
    this.cursors = null;
  }

  preload() {
    this.load.image('background', 'assets/images/space.jpeg');
  }

  create() {
    const storage = this._getStorage();
    this.player = new Player(this, storage.worldData.relativeZonesSizes);

    const { worldBounds } = storage.worldData;
    // TODO: optimize tile so it don't consume memory
    this.add.tileSprite(worldBounds[2] / 2, worldBounds[3] / 2, worldBounds[2], worldBounds[3], 'background');
    this.cursors = this.input.keyboard.createCursorKeys();

    for (const playerData of Object.values(storage.worldData.playersData)) {
      if (storage.playerData.id === playerData.id) {
        continue;
      }

      this._createAndSpawnPlayer(playerData);
    }

    for (const asteroidData of Object.values(storage.worldData.asteroidsData)) {
      this._createAndSpawnAsteroid(asteroidData);
    }

    this.player.spawn(storage.playerData);

    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.setBounds(...worldBounds, true, true, true, true);
    this.cameras.main.startFollow(this.player.circle);
  }

  update() {
    this._updatePlayers();
    this._updateAsteroids();

    for (const otherPlayer of this.otherPlayers.values()) {
      otherPlayer.redraw();
    }

    for (const asteroid of this.asteroids.values()) {
      asteroid.redraw();
    }

    this.player.redraw();
    this._handleInput();
  }

  _handleInput() {
    Object.assign(this.previousKeysPressState, this.keysPressState);

    this.keysPressState.up = this.cursors.up.isDown;
    this.keysPressState.down = this.cursors.down.isDown;
    this.keysPressState.left = this.cursors.left.isDown;
    this.keysPressState.right = this.cursors.right.isDown;
    this.keysPressState.space = this.cursors.space.isDown;

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

  _updatePlayers() {
    const storage = this._getStorage();

    for (const playerData of Object.values(storage.worldData.playersData)) {
      if (this.player.playerData.id === playerData.id) {
        continue;
      }

      if (!this.otherPlayers.has(playerData.id)) {
        this._createAndSpawnPlayer(playerData);
      }
    }

    for (const [key, otherPlayer] of this.otherPlayers.entries()) {
      if (storage.worldData.playersData[key]) {
        continue;
      }

      otherPlayer.destroy();
      this.otherPlayers.delete(key);
    }
  }

  _updateAsteroids() {
    const storage = this._getStorage();

    for (const asteroidsData of Object.values(storage.worldData.asteroidsData)) {
      if (!this.asteroids.has(asteroidsData.id)) {
        this._createAndSpawnPlayer(asteroidsData);
      }
    }

    for (const [key, asteroid] of this.asteroids.entries()) {
      if (storage.worldData.asteroidsData[key]) {
        continue;
      }

      asteroid.destroy();
      this.asteroids.delete(key);
    }
  }

  _createAndSpawnPlayer(playerData) {
    const player = new Player(this, this._getStorage().worldData.relativeZonesSizes);
    this.otherPlayers.set(playerData.id, player);
    player.spawn(playerData);

    return player;
  }

  _createAndSpawnAsteroid(asteroidData) {
    const asteroid = new Asteroid(
      this,
      this._getStorage().worldData.asteroidAttractionRadiusMultiplier,
    );
    this.asteroids.set(asteroidData.id, asteroid);
    asteroid.spawn(asteroidData);

    return asteroid;
  }
}

export default Space;
