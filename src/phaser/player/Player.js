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
    this.playerNameText = null;
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

    const fontSize = this._getFontSize();
    this.playerNameText = this.scene.add.text(
      fontSize / 2,
      fontSize / 2,
      playerData.username,
      { fontSize: `${fontSize}px`, fill: '#000', fontFamily: 'Verdana' },
    );
    this.playerNameText.setDepth(1000);
    this.redraw();
  }

  clear() {
    this.graphics.clear();

    for (const [, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.clear();
    }
  }

  destroy() {
    this.graphics.destroy();

    for (const [, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.destroy();
    }

    this.playerNameText.destroy();
  }

  redraw() {
    this.circle.x = this.playerData.x;
    this.circle.y = this.playerData.y;
    this.clear();
    this.graphics.fillCircle(this.playerData.x, this.playerData.y, this.playerData.r)
    const fontSize = this._getFontSize();
    this.playerNameText.x = this.playerData.x - this.playerNameText.displayWidth / 2;
    this.playerNameText.y = this.playerData.y - fontSize / 2;
    this.playerNameText.setFontSize(fontSize);

    for (const [i, graphics] of Object.entries(this.zonesGraphics)) {
      const r = this.playerData.r * this.relativeZonesSizes[i];
      graphics.fillCircle(this.playerData.x, this.playerData.y, r);
      graphics.strokeCircle(this.playerData.x, this.playerData.y, r);
    }
  }

  _getFontSize() {
    const fontSize = 26;

    return fontSize / this._getStorage().zoom;
  }

  _getStorage() {
    return this.scene.sys.game.storage;
  }
}

export default Player;
