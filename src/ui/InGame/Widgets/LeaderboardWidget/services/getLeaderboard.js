const getLeaderboard = (playerData, playersData) => {
  const orderedPlayers = Object.values(playersData).sort((v1, v2) => {
    return v1.score > v2.score ? 1 : -1;
  });
  const playerPosition = orderedPlayers.findIndex(v => v.id === playerData.id);

  return [
    { position: playerPosition, name: 'Player 1', isCurrentPlayer: false },
  ];
};

export default getLeaderboard;
