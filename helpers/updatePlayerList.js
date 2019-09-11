module.exports = (playerData) => {
  const takenPlayers = require('../data/takenPlayers')
  const myPlayers = require('../data/myPlayers')

  const allUnavailable = [...takenPlayers, ...myPlayers];

  return playerData.filter(playerObj => {
    return !allUnavailable.includes(playerObj.PLAYER)
  })

}