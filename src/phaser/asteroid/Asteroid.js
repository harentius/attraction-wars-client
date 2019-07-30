const ASTEROID_COLOR = 0xa1a7af;
const ZONE_LINE_WIDTH = 2;
const LINE_COLOR = 0x56473d;

class Asteroid {
  constructor(scene, asteroidAttractionRadiusMultiplier) {
    this.scene = scene;
    this.asteroidAttractionRadiusMultiplier = asteroidAttractionRadiusMultiplier;
    this.sprite = null;
    this.graphics = null;
    this.gravityZoneGraphics = null;
    this.asteroidData = null;
  }

  spawn(asteroidData) {
    this.asteroidData = asteroidData;
    // this.sprite = new Phaser.Geom.Circle(asteroidData.x, asteroidData.y, asteroidData.r);
    this.sprite = this.scene.add.sprite(asteroidData.x, asteroidData.y, `asteroid-${asteroidData.color}`);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: ASTEROID_COLOR } });

    this.gravityZoneGraphics = this.scene.add.graphics({
      fillStyle: { color: ASTEROID_COLOR, alpha: 100 },
      lineStyle: { color: LINE_COLOR, width: ZONE_LINE_WIDTH, alpha: 1 },
    });
    this.gravityZoneGraphics.setDepth(-500);
    this.redraw();
  }

  redraw() {
    this._clear();
    this.sprite.x = this.asteroidData.x;
    this.sprite.y = this.asteroidData.y;
    this.sprite.displayWidth = 2 * this.asteroidData.r;
    this.sprite.displayHeight = 2 * this.asteroidData.r;

    const r = this.asteroidData.r * this.asteroidAttractionRadiusMultiplier;
    this.gravityZoneGraphics.strokeCircle(this.asteroidData.x, this.asteroidData.y, r);
  }

  destroy() {
    this.sprite.destroy();
    this._clear();
  }

  _clear() {
    this.graphics.clear();
    this.gravityZoneGraphics.clear();
  }
}

export default Asteroid;
