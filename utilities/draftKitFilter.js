const User = require('../models/User');

module.exports = (players, type) => {
  const espnSkaterFilter = ['LWLRANK', 'PLAYER', 'TEAM', 'EPOS', 'EADP', 'PR',]
  const espnGoalieFilter = ['LWLRANK', 'PLAYER', 'TEAM', 'EADP', 'PR',]
  const espnFilter = type === 'skaters' ? espnSkaterFilter : espnGoalieFilter;
  const zero = type === 'skaters' ? '0' : '0.0'
  const newArray = [];
  for (const player of players) {
    const entries = Object.entries(player);
    const playerObj = {}
    entries
      .filter(entry => {
        return (espnFilter.includes(entry[0]) || (entry[0].includes('FSI') && entry[1] !== zero))
      })
      .map(entry => {
        return { [entry[0]]: entry[1] }
      })
      .forEach(entry => Object.assign(playerObj, entry))

    newArray.push(playerObj)
  }
  return JSON.stringify(newArray)
}
