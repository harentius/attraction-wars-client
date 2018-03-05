import Phaser from 'phaser';
import { RotationData } from './data/PlayerData';

// First zone is closest to circle
const getInteractionZone = (player, otherPlayer) => {
  // Check is first zone.
  let i = 0;

  // eslint-disable-next-line no-restricted-syntax
  for (const RofZone of [1.5, 2.5, 3.5]) {
    i++;
    const { x, y, r } = otherPlayer.playerData;
    const circle = new Phaser.Geom.Circle(x, y, RofZone * r);
    if (circle.contains(player.circle.x, player.circle.y)) {
      return i;
    }
  }

  return null;
};

const startRotatingIfNeed = (player, otherPlayers) => {
  // TODO: get otherPlayer with minimum distance
  otherPlayers.forEach((otherPlayer) => {
    const interactionZone = getInteractionZone(player, otherPlayer);

    if (interactionZone === 3) {
      const R = Math.sqrt(
        (otherPlayer.playerData.x - player.playerData.x) ** 2
        + (otherPlayer.playerData.y - player.playerData.y) ** 2,
      );

      player.setRotationData(new RotationData(
        otherPlayer.playerData.x,
        otherPlayer.playerData.y,
        R,
      ));
    } else if (interactionZone === null && player.playerData.rotationData !== null) {
      player.cleanRotationData();
    }
  });
};

export { startRotatingIfNeed };
