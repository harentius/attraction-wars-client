import Phaser from 'phaser';
import config from '../../config';
import Planet from '../planet/Planet';
import KeysPressState from '../../client/KeysPressState';
import Asteroid from '../asteroid/Asteroid';
import Storage from '../../Storage';

class Space extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
    this.player = null;
    this.otherPlayers = new Map();
    this.asteroids = new Map();
    this.previousKeysPressState = new KeysPressState();
    this.keysPressState = new KeysPressState();
    this.cursors = null;
    this.background = null;
  }

  preload() {
    const text = this.add.text(100, 100, 'Loading...', { fontSize: 72 });
    text.setDepth(-1500);
    const zone = this.add.zone(config.width / 2, config.height / 2, config.width, config.height);
    Phaser.Display.Align.In.Center(text, zone);

    this.load.image('background', require('../../../resources/phaser/images/space.png'));

    for (let i = 0; i < 10; i++) {
      const img = require(`../../../resources/phaser/images/planets/${i}.png?size=2700`);
      this.load.spritesheet(
        `planet-${i}`,
        img.src,
        { frameWidth: 300, frameHeight: 300 },
      );
    }

    for (let i = 0; i < 20; i++) {
      const img = require(`../../../resources/phaser/images/asteroids/${i}.png?size=200`);
      this.load.image(`asteroid-${i}`, img.src);
    }
  }

  create() {
    const storage = this._getStorage();
    this.player = new Planet(this, storage.worldData.relativeZonesSizes, true);

    const x0 = storage.playerData.x;
    const y0 = storage.playerData.y;
    this.background = this.add.tileSprite(
      x0,
      y0,
      config.width / config.minZoom,
      config.height / config.minZoom,
      'background',
    );
    this.background.setDepth(-1000);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player.spawn(storage.playerData);

    this.cameras.main.setSize(config.width, config.height);
    this.cameras.main.setZoom(this._getStorage().zoom);
    this.cameras.main.setBounds(...storage.worldData.worldBounds, true, true, true, true);
    this.cameras.main.startFollow(this.player.sprite);

    storage.on(Storage.UPDATE_ZOOM, (zoom) => {
      this.cameras.main.zoomTo(zoom, 1000);
    });
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
    const { worldView } = this.cameras.main;
    this.background.setTilePosition(worldView.centerX, worldView.centerY);
    this.background.x = worldView.centerX;
    this.background.y = worldView.centerY;
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
    const influenceMultiplier = storage.worldData.relativeZonesSizes[2];

    for (const playerData of Object.values(storage.worldData.playersData)) {
      if (this.player.playerData.id === playerData.id) {
        continue;
      }

      if (!this.otherPlayers.has(playerData.id)
        && this._isCircleInViewPort(playerData.x, playerData.y, playerData.r * influenceMultiplier)
      ) {
        this._createAndSpawnPlayer(playerData);
      }
    }

    for (const [key, otherPlayer] of this.otherPlayers.entries()) {
      const playerData = storage.worldData.playersData[key];

      if (playerData
        && this._isCircleInViewPort(playerData.x, playerData.y, playerData.r * influenceMultiplier)
      ) {
        continue;
      }

      otherPlayer.destroy();
      this.otherPlayers.delete(key);
    }
  }

  _updateAsteroids() {
    const storage = this._getStorage();
    const influenceMultiplier = storage.worldData.asteroidAttractionRadiusMultiplier;

    for (const asteroidsData of Object.values(storage.worldData.asteroidsData)) {
      if (!this.asteroids.has(asteroidsData.id)
        && this._isCircleInViewPort(
          asteroidsData.x,
          asteroidsData.y,
          asteroidsData.r * influenceMultiplier,
        )
      ) {
        this._createAndSpawnAsteroid(asteroidsData);
      }
    }

    for (const [key, asteroid] of this.asteroids.entries()) {
      const asteroidData = storage.worldData.asteroidsData[key];

      if (asteroidData
        && this._isCircleInViewPort(
          asteroidData.x,
          asteroidData.y,
          asteroidData.r * influenceMultiplier,
        )
      ) {
        continue;
      }

      asteroid.destroy();
      this.asteroids.delete(key);
    }
  }

  _createAndSpawnPlayer(playerData) {
    const player = new Planet(this, this._getStorage().worldData.relativeZonesSizes);
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

  _isCircleInViewPort(x, y, r) {
    const { worldView } = this.cameras.main;

    return ((worldView.left - r) < x)
      && ((worldView.right + r) > x)
      && (worldView.top - r) < y
      && (worldView.bottom + r) > y
    ;
  }
}

export default Space;
