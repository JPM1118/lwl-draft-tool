const streamRouter = require('express').Router();
const Update = require('../utilities/UpdateNotifier');

streamRouter.get('/', (req, res, next) => {
  req.test = res;
  res.sseSetup();
  Update.on('sendTakenPlayers', function (players) {
    res.write("event: takenUpdate\n")
    res.write("data: " + JSON.stringify(players) + "\n\n");
  })
  Update.on('sendMyPlayers', function (players) {
    res.write("event: myTeamUpdate\n")
    res.write("data: " + JSON.stringify(players) + "\n\n");
  })
  res.sseSendTest('Hello World!')

})

module.exports = streamRouter;