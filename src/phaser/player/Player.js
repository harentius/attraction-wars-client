import Phaser from 'phaser';

class Player {
  constructor(scene, relativeZonesSizes) {
    this.scene = scene;
    this.relativeZonesSizes = relativeZonesSizes;
    this.alphas = [150, 170, 190];
    this.circle = null;
    this.graphics = null;
    this.zonesGraphics = [];
    this.playerData = null;
  }

  spawn(playerData) {
    this.playerData = playerData;
    this.circle = new Phaser.Geom.Circle(playerData.x, playerData.y, playerData.r);
    this.graphics = this.scene.add.graphics({ fillStyle: { color: playerData.color } });

    for (const i of Object.keys(this.relativeZonesSizes)) {
      const graphics = this.scene.add.graphics({
        fillStyle: { color: playerData.color, alpha: this.alphas[i] },
        lineStyle: { color: 0xffffff, width: 1, alpha: 1 },
      });

      this.zonesGraphics.push(graphics);
    }

    this.redraw();
  }

  destroy() {
    this.graphics.clear();
  }

  redraw() {
    this.circle.x = this.playerData.x;
    this.circle.y = this.playerData.y;
    this.graphics.clear();
    this.graphics.fillCircle(this.playerData.x, this.playerData.y, this.playerData.r);

    for (const [i, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.clear();
      const r = this.playerData.r * this.relativeZonesSizes[i];
      graphics.fillCircle(this.playerData.x, this.playerData.y, r);
      graphics.strokeCircle(this.playerData.x, this.playerData.y, r);
    }
  }
}

export default Player;
