export function filterMyPlayers(players) {
  const myPicks = [
    1, 20, 21, 40, 41, 60, 61, 80, 81, 100, 101, 120, 121, 140, 141, 160, 161,
    180, 181, 200, 201, 220,
  ];
  return players.filter((player) =>
    myPicks.some((pick) => pick === player.pick)
  );
}
export function filterMyFsi(takenPlayers, availablePlayers) {
  const myPicks = [
    1, 20, 21, 40, 41, 60, 61, 80, 81, 100, 101, 120, 121, 140, 141, 160, 161,
    180, 181, 200, 201, 220,
  ];
  const myTakenPlayers = takenPlayers.filter((player) =>
    myPicks.some((pick) => pick === player.pick)
  );

  return availablePlayers.filter((availablePlayer) =>
    myTakenPlayers.some(
      (takenPlayer) => takenPlayer.name === availablePlayer.PLAYER
    )
  );
}

export function filterAvailablePlayers(takenPlayers, availablePlayers) {
  return availablePlayers.filter(
    (availablePlayer) =>
      !takenPlayers.some(
        (takenPlayer) => takenPlayer.name === availablePlayer.PLAYER
      )
  );
}
