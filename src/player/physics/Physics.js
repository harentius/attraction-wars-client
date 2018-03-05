import Phaser from 'phaser';
import getInteractionZoneHandler from './interaction-zone-handler/registry';

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
    getInteractionZoneHandler(interactionZone)(player, otherPlayer);
  });
};

export { startRotatingIfNeed };
