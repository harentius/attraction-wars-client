const createLeaderData = (playerData, playerPosition, isCurrentPlayer = false) => ({
  position: playerPosition + 1,
  username: playerData.username,
  isCurrentPlayer,
});

const getLeaderboard = (playerData, playersData) => {
  const orderedPlayers = Object.values(playersData)
    .sort((v1, v2) => (v1.score < v2.score ? 1 : -1))
  ;

  const playerPosition = orderedPlayers.findIndex((v) => v.id === playerData.id);
  const playersMap = {};
  playersMap[playerPosition] = createLeaderData(
    orderedPlayers[playerPosition],
    playerPosition,
    true,
  );

  for (const [i, player] of orderedPlayers.entries()) {
    if (i !== playerPosition) {
      playersMap[i] = createLeaderData(player, i);
    }

    if (Object.values(playersMap).length > 10) {
      break;
    }
  }

  return Object.values(playersMap)
    .sort((v1, v2) => (v1.position > v2.position ? 1 : -1))
  ;
};

export default getLeaderboard;
