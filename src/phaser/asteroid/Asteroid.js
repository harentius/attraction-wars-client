import Phaser from 'phaser';

const ASTEROID_COLOR = 0xffffff;

class Asteroid {
  constructor(scene) {
    this.scene = scene;
    this.circle = null;
    this.graphics = null;
    this.asteroidData = null;
  }

  spawn(asteroidData) {
    this.asteroidData = asteroidData;
    this.circle = new Phaser.Geom.Circle(asteroidData.x, asteroidData.y, asteroidData.r);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: ASTEROID_COLOR } });
    this.graphics.fillCircle(this.asteroidData.x, this.asteroidData.y, this.asteroidData.r);
  }

  destroy() {
    this.graphics.clear();
  }
}

export default Asteroid;
