import { random } from '../../utils';

const SCORE_TEXT_SIZE = 30;
const SCORE_TEXT_COLOR = '#92ff5b';
const SCORE_TEXT_SHADOW_COLOR = '#f6ff00';

const showScoreAcquiration = (playerData, scene, score, scale) => {
  const text = scene.add.text(
    0,
    SCORE_TEXT_SIZE / 2,
    score,
    { fontSize: SCORE_TEXT_SIZE, fill: SCORE_TEXT_COLOR, fontFamily: 'Verdana' },
  );
  text.setShadow(1, 1, SCORE_TEXT_SHADOW_COLOR, 5, false);

  text.setScale(scale);

  const xShift = random(-1.3, 1.3);
  const yShift = random(1.4, 2.0);

  scene.tweens.addCounter({
    from: 1,
    to: 0,
    duration: 2000,
    onUpdate: (tween) => {
      text.setAlpha(tween.getValue());
      text.x = playerData.x - xShift * playerData.r;
      text.y = playerData.y - yShift * playerData.r;
    },
    onComplete: () => {
      text.destroy();
    },
  });
};

export default showScoreAcquiration;
