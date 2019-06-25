import Phaser from 'phaser';

const ASTEROID_COLOR = 0xa1a7af;

class Asteroid {
  constructor(scene, asteroidAttractionRadiusMultiplier) {
    this.scene = scene;
    this.asteroidAttractionRadiusMultiplier = asteroidAttractionRadiusMultiplier;
    this.circle = null;
    this.graphics = null;
    this.gravityZoneGraphics = null;
    this.asteroidData = null;
  }

  spawn(asteroidData) {
    this.asteroidData = asteroidData;
    this.circle = new Phaser.Geom.Circle(asteroidData.x, asteroidData.y, asteroidData.r);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: ASTEROID_COLOR } });

    this.gravityZoneGraphics = this.scene.add.graphics({
      fillStyle: { color: ASTEROID_COLOR, alpha: 100 },
      lineStyle: { color: 0xffffff, width: 1, alpha: 1 },
    });
    this.redraw();
  }

  redraw() {
    this.destroy();
    this.graphics.fillCircle(this.asteroidData.x, this.asteroidData.y, this.asteroidData.r);
    const r = this.asteroidData.r * this.asteroidAttractionRadiusMultiplier;
    this.gravityZoneGraphics.fillCircle(this.asteroidData.x, this.asteroidData.y, r);
    this.gravityZoneGraphics.strokeCircle(this.asteroidData.x, this.asteroidData.y, r);
  }

  destroy() {
    this.graphics.clear();
    this.gravityZoneGraphics.clear();
  }
}

export default Asteroid;
