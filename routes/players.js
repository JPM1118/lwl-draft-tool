const playerRouter = require('express').Router()
const User = require('../models/User');
const Update = require('../utilities/UpdateNotifier');

playerRouter.get('/getPlayerList', async (req, res, next) => {
  try {
    const draftKitFilter = require('../utilities/draftKitFilter')
    const user = await User.findById(req.user.userId)
    const skaterData = draftKitFilter(user.skaters, 'skaters');
    const goalieData = draftKitFilter(user.goalies, 'goalies');
    res.status(200).json({ "skaters": skaterData, "goalies": goalieData })
  } catch (e) {
    console.error(e)
    res.status(500).send('error.')
  }
})

playerRouter.post('/refreshPlayerList', async (req, res, next) => {
  try {
    const { name } = req.body.data;
    const user = await User.findById(req.user.userId);
    const players = req.body.data.isSkater ? user.skaters : user.goalies;
    const newPlayer = players.find(el => el.PLAYER === name)


    if (req.body.data.isMine) {
      const myTeam = user.myPlayers;
      const newMyTeam = [...myTeam, newPlayer];
      Update.emit('sendMyPlayers', newMyTeam)
      user.myPlayers = newMyTeam;
      await user.save()
    } else {
      const takenPlayers = user.takenPlayers;
      const newTakenPlayers = [...takenPlayers, newPlayer];
      Update.emit('sendTakenPlayers', newTakenPlayers);
      user.takenPlayers = newTakenPlayers;
      await user.save()
    }
    res.status(200).send('Got it')
  } catch (e) {
    console.error(e)
  }
})

module.exports = playerRouter