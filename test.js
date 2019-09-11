const updatePlayerList = require('./helpers/updatePlayerList');
const skaters = require('./data/skaters.json');

try {
  let newList = updatePlayerList(skaters);

  console.log(newList[0].PLAYER)
} catch (e) { console.error(e) }
