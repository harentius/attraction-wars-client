import Storage from 'attraction-wars-client-storage/src/Storage';
import showScoreAcquiration from './showScoreAcquiration';

const ZONE_LINE_WIDTH = 2;
const ZONE_LINE_COLOR = 0x634269;
const PLAYERS_NAME_FONT_SIZE = 26;
const PLAYERS_NAME_COLOR = '#000';
const PLAYERS_NAME_SHADOW_COLOR = '#fff';

const SCORE_MIN_VISIBLE_CHANGE = 2;

const MIN_DR_TO_ANIMATE = 0.5;

class Planet {
  constructor(scene, relativeZonesSizes, showScores = false) {
    this.scene = scene;
    this.relativeZonesSizes = relativeZonesSizes;
    this.showScores = showScores;
    this.alphas = [1, 0.6, 0.4];
    this.sprite = null;
    this.zonesGraphics = [];
    this.playerData = null;
    this.playerNameText = null;
    this.oldR = null;
  }

  spawn(playerData) {
    this.playerData = playerData;
    this.sprite = this.scene.add.sprite(playerData.x, playerData.y, `planet-${playerData.color}`);
    this.oldR = playerData.r;
    this.scene.anims.create({ key: `planet-${playerData.color}`, frames: [{ key: `planet-${playerData.color}`, frame: 0 }] });
    this.scene.anims.create({
      key: `planet-grow-${playerData.color}`,
      duration: 500,
      frames: this.scene.anims.generateFrameNumbers(`planet-${playerData.color}`, {
        start: 1,
        end: 8,
      }),
      repeat: 2,
    });

    this.sprite.anims.play(`planet-${playerData.color}`, true);

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

    if (this.showScores) {
      this._getStorage().on(Storage.UPDATE_SCORE, (oldScore, score) => {
        const scoreChange = score - oldScore;

        if (scoreChange >= SCORE_MIN_VISIBLE_CHANGE) {
          const scale = this._getStorage().getScale();
          showScoreAcquiration(this.playerData, this.scene, scoreChange, scale);
        }
      });
    }
  }

  clear() {
    for (const [, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.clear();
    }
  }

  destroy() {
    this.sprite.destroy();

    for (const [, graphics] of Object.entries(this.zonesGraphics)) {
      graphics.destroy();
    }

    this.playerNameText.destroy();
  }

  redraw() {
    this.sprite.x = this.playerData.x;
    this.sprite.y = this.playerData.y;

    this.sprite.displayWidth = 2 * this.playerData.r;
    this.sprite.displayHeight = 2 * this.playerData.r;

    if (this.playerData.r - this.oldR > MIN_DR_TO_ANIMATE) {
      this._animateGrow();
    }

    this.oldR = this.playerData.r;

    this.clear();
    const scale = this._getStorage().getScale();
    this.playerNameText.x = this.playerData.x - this.playerNameText.displayWidth / 2;
    this.playerNameText.y = this.playerData.y - PLAYERS_NAME_FONT_SIZE * scale / 2;
    this.playerNameText.setScale(scale);

    for (const [i, graphics] of Object.entries(this.zonesGraphics)) {
      const r = this.playerData.r * this.relativeZonesSizes[i];
      graphics.lineStyle(
        ZONE_LINE_WIDTH * scale,
        ZONE_LINE_COLOR,
        this.alphas[i],
      );
      graphics.strokeCircle(this.playerData.x, this.playerData.y, r);
      graphics.setDepth(-500);
    }
  }

  _animateGrow() {
    this.sprite.anims.play(`planet-grow-${this.playerData.color}`);
    this.sprite.anims.chain(`planet-${this.playerData.color}`);
  }

  _getStorage() {
    return this.scene.sys.game.storage;
  }
}

export default Planet;
