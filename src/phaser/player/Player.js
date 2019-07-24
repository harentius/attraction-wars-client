const ZONE_LINE_WIDTH = 2;
const ZONE_LINE_COLOR = 0x634269;
const PLAYERS_NAME_FONT_SIZE = 26;
const PLAYERS_NAME_COLOR = '#000';
const PLAYERS_NAME_SHADOW_COLOR = '#fff';

class Player {
  constructor(scene, relativeZonesSizes) {
    this.scene = scene;
    this.relativeZonesSizes = relativeZonesSizes;
    this.alphas = [1, 0.6, 0.4];
    this.circle = null;
    this.zonesGraphics = [];
    this.playerData = null;
    this.playerNameText = null;
  }

  spawn(playerData) {
    this.playerData = playerData;
    this.circle = this.scene.add.sprite(playerData.x, playerData.y, `planet-${playerData.color}`);

    for (let i = 0; i < Object.keys(this.relativeZonesSizes).length; i++) {
      const graphics = this.scene.add.graphics();
      this.zonesGraphics.push(graphics);
    }

    this.playerNameText = this.scene.add.text(
      0,
      PLAYERS_NAME_FONT_SIZE / 2,
      playerData.username,
      { fontSize: PLAYERS_NAME_FONT_SIZE, fill: PLAYERS_NAME_COLOR, fontFamily: 'Verdana' },
    );
    this.playerNameText.setDepth(1000);
    this.playerNameText.setShadow(1, 1, PLAYERS_NAME_SHADOW_COLOR, 2, false);
    this.redraw();
  }

  clear() {
    for (const [, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.clear();
    }
  }

  destroy() {
    for (const [, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.destroy();
    }

    this.playerNameText.destroy();
  }

  redraw() {
    this.circle.x = this.playerData.x;
    this.circle.y = this.playerData.y;
    this.circle.displayWidth = 2 * this.playerData.r;
    this.circle.displayHeight = 2 * this.playerData.r;
    this.clear();
    const scale = 1.0 / this._getStorage().zoom;
    this.playerNameText.x = this.playerData.x - this.playerNameText.displayWidth / 2;
    this.playerNameText.y = this.playerData.y - PLAYERS_NAME_FONT_SIZE * scale / 2;
    this.playerNameText.setScale(scale);

    for (const [i, graphics] of Object.entries(this.zonesGraphics)) {
      const r = this.playerData.r * this.relativeZonesSizes[i];
      graphics.lineStyle(
        ZONE_LINE_WIDTH / this._getStorage().zoom,
        ZONE_LINE_COLOR,
        this.alphas[i],
      );
      graphics.strokeCircle(this.playerData.x, this.playerData.y, r);
    }
  }

  _getStorage() {
    return this.scene.sys.game.storage;
  }
}

export default Player;
