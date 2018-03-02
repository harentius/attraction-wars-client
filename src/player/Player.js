import Phaser from 'phaser';
import config from '../config';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.graphics = null;
    this.circle = null;
    this.playerData = null;
  }

  spawn(playerData) {
    this.playerData = playerData;
    this.circle = new Phaser.Geom.Circle(playerData.x, playerData.y, playerData.r);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: 0x303331 } });
    this.graphics.fillCircleShape(this.circle);
  }

  accelerate({ dAx, dAy }) {
    this.playerData.aX += dAx;
    this.playerData.aY += dAy;
  }

  // dt for now equal 1 to simplify math. Change it if needed.
  updateData() {
    // Recalculate V, x
    this.playerData.vX += this.playerData.aX;
    this.playerData.vY += this.playerData.aY;

    this.playerData.x += this.playerData.vX;
    this.playerData.y += this.playerData.vY;

    this._checkBoundCollisions();
    this._redraw();
  }

  _redraw() {
    this.circle.x = this.playerData.x;
    this.circle.y = this.playerData.y;
    this.graphics.clear();
    this.graphics.fillCircleShape(this.circle);
  }

  _checkBoundCollisions() {
    if (
      (this.playerData.x < (config.worldBounds[0] + this.playerData.r))
        ||
      (this.playerData.x > (config.worldBounds[2] - this.playerData.r))
    ) {
      this.playerData.vX *= -1;
    }

    if (
      (this.playerData.y < (config.worldBounds[1] + this.playerData.r))
        ||
      (this.playerData.y > (config.worldBounds[3] - this.playerData.r))
    ) {
      this.playerData.vY *= -1;
    }
  }
}
