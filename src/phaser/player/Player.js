import Storage from '../../Storage';
import { random } from '../../utils';

const ZONE_LINE_WIDTH = 2;
const ZONE_LINE_COLOR = 0x634269;
const PLAYERS_NAME_FONT_SIZE = 26;
const PLAYERS_NAME_COLOR = '#000';
const PLAYERS_NAME_SHADOW_COLOR = '#fff';

const SCORE_MIN_VISIBLE_CHANGE = 2;
const SCORE_TEXT_SIZE = 30;
const SCORE_TEXT_COLOR = '#92ff5b';
const SCORE_TEXT_SHADOW_COLOR = '#feff98';

class Player {
  constructor(scene, relativeZonesSizes) {
    this.scene = scene;
    this.relativeZonesSizes = relativeZonesSizes;
    this.alphas = [1, 0.6, 0.4];
    this.sprite = null;
    this.zonesGraphics = [];
    this.playerData = null;
    this.playerNameText = null;
  }

  spawn(playerData) {
    this.playerData = playerData;
    this.sprite = this.scene.add.sprite(playerData.x, playerData.y, `planet-${playerData.color}`);

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

    this._getStorage().on(Storage.UPDATE_SCORE, (oldScore, score) => {
      const scoreChange = score - oldScore;

      if (scoreChange > SCORE_MIN_VISIBLE_CHANGE) {
        this._showScoreAcquiration(scoreChange);
      }
    });
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
    }
  }

  _getStorage() {
    return this.scene.sys.game.storage;
  }

  _showScoreAcquiration(score) {
    const text = this.scene.add.text(
      0,
      SCORE_TEXT_SIZE / 2,
      score,
      { fontSize: SCORE_TEXT_SIZE, fill: SCORE_TEXT_COLOR, fontFamily: 'Verdana' },
    );
    text.setShadow(1, 1, SCORE_TEXT_SHADOW_COLOR, 5, false);

    const scale = this._getStorage().getScale();
    text.setScale(scale);

    const xShift = random(-1.3, 1.3);
    const yShift = random(1.4, 2.0);

    this.scene.tweens.addCounter({
      from: 1,
      to: 0,
      duration: 2000,
      onUpdate: (tween) => {
        text.setAlpha(tween.getValue());
        text.x = this.playerData.x - xShift * this.playerData.r;
        text.y = this.playerData.y - yShift * this.playerData.r;
      },
      onComplete: () => {
        text.destroy();
      },
    });
  }
}

export default Player;
