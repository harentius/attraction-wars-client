import { RotationData } from '../../data/PlayerData';

export default (player, otherPlayer) => {
  const R = Math.sqrt(
    (otherPlayer.playerData.x - player.playerData.x) ** 2
    + (otherPlayer.playerData.y - player.playerData.y) ** 2,
  );

  player.setRotationData(new RotationData(
    otherPlayer.playerData.x,
    otherPlayer.playerData.y,
    R,
  ));
};
