import Phaser from 'phaser';
import config from '../config';
import { getValueNotViolatingBounds } from '../utils';

export default class {
  constructor(scene) {
    this.scene = scene;
    this.graphics = null;
    this.circle = null;
    this.playerData = null;
    this.maxSpeed = 10;
    this.minSpeed = 0;
  }

  spawn(playerData, color = 0x303331) {
    this.playerData = playerData;
    this.circle = new Phaser.Geom.Circle(playerData.x, playerData.y, playerData.r);
    this.graphics = this.scene.add.graphics({ fillStyle: { color } });
    this.graphics.fillCircleShape(this.circle);
  }

  changeVelocity({ dVx, dVy }) {
    const considerStoppedWhen = Math.min(config.releaseDv, config.keyPressDv) / 2;
    const newVx = this.playerData.vX + dVx;
    const newVy = this.playerData.vY + dVy;
    this.playerData.vX = getValueNotViolatingBounds(newVx, -this.maxSpeed, this.maxSpeed);
    this.playerData.vY = getValueNotViolatingBounds(newVy, -this.maxSpeed, this.maxSpeed);

    if (Math.abs(this.playerData.vX) < considerStoppedWhen) {
      this.playerData.vX = this.minSpeed;
    }

    if (Math.abs(this.playerData.vY) < considerStoppedWhen) {
      this.playerData.vY = this.minSpeed;
    }
  }

  setRotationData(rotationData) {
    this.playerData.rotationData = rotationData;
  }

  cleanRotationData() {
    this.playerData.rotationData = null;
  }

  isStoppedX() {
    return this.playerData.vX === this.minSpeed;
  }

  isStoppedY() {
    return this.playerData.vY === this.minSpeed;
  }

  // dt for now equal 1 to simplify math. Change it if needed.
  updateData() {
    if (this.playerData.rotationData !== null) {
      Phaser.Math.RotateAroundDistance(
        this.circle,
        this.playerData.rotationData.x,
        this.playerData.rotationData.y,
        0.0075,
        this.playerData.rotationData.R,
      );
    }
    this.playerData.x = this.circle.x;
    this.playerData.y = this.circle.y;
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
