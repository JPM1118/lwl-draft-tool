const playerRouter = require('express').Router()
const User = require('../models/User');
const draftKitFilter = require('../utilities/draftKitFilter')
const myPicks = require('../utilities/myPicks');

playerRouter.get('/getPlayerList', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)

    res.status(200).json({
      "players": user.players,
      "takenPlayers": user.takenPlayers,
      "myPlayers": user.myPlayers
    })
  } catch (e) {
    console.error(e)
    res.status(500).send('error.')
  }
})

playerRouter.post('/refreshPlayerList', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId);
    const { name } = req.body.data;
    const myPick = parseInt(user.draftPick)
    const pos = req.body.data.isSkater ? 'skaters' : 'goalies';
    const newPlayer = user.players[pos].find(el => el.PLAYER === name)
    const pickArray = myPicks(myPick)
    const isMine = pickArray.some(pick => req.body.data.pick === pick + 1)
    if (isMine) {
      const myTeam = user.myPlayers[pos];
      let newMyTeam;
      if (myTeam.length !== 0 && myTeam.some(e => e.PLAYER === name)) {
        newMyTeam = myTeam.filter((e, i) => i !== myTeam.length - 1)
      } else {

        newMyTeam = [...myTeam, newPlayer];
      }
      // req.app.io.emit("sendMyPlayers", { data: draftKitFilter(newMyTeam, pos), position: pos })
      user.myPlayers[pos] = newMyTeam;
      await user.save()
    } else {
      const takenPlayers = user.takenPlayers[pos];
      let newTakenPlayers;
      if (takenPlayers.some(e => e.PLAYER === name)) {
        newTakenPlayers = takenPlayers.filter((e, i) => i !== takenPlayers.length - 1)
      } else {

        newTakenPlayers = [...takenPlayers, newPlayer];
      }
      // req.app.io.emit('sendTakenPlayers', { data: draftKitFilter(newTakenPlayers, pos), position: pos })
      user.takenPlayers[pos] = newTakenPlayers;
      await user.save()
    }
    return res.status(200).send('got it.');
  } catch (e) {
    console.error(e)
  }
})

module.exports = playerRouter