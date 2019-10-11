const playerRouter = require('express').Router()
const User = require('../models/User');
const myPicks = require('../utilities/myPicks');

//send player info for initial frontend render
playerRouter.get('/getPlayerList', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)

    user.players.skaters.forEach(player => {
      if (player.EADP === 0) {
        player.EADP = '-'
      }
    })
    user.players.goalies.forEach(player => {
      if (player.EADP === 0) {
        player.EADP = '-'
      }
    })

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

    const { name, totalPlayersDrafted, pick, position } = req.body.data;

    let newPlayer = user.players[position].find(player => player.PLAYER === name)
    const pickArray = await myPicks(req.user.userId);
    const newPickIsMine = pickArray.some(myPick => myPick === pick);
    const totalPlayersSaved = (user.takenPlayers.skaters.length) + (user.takenPlayers.goalies.length)

    //check if draft page was reloaded
    if (totalPlayersDrafted === totalPlayersSaved) {
      return res.status(200).json({ msg: 'page reloaded' })
    }

    //check if draft is ahead of database due to unforseen error


    //check if name of drafted player is in 'player' array. If not, check last name only
    if (newPlayer === undefined) {
      const lastName = name.substring(name.indexOf(' '));
      newPlayer = user.players[position].find(savedPlayer => {
        const savedPlayerLastName = savedPlayer.PLAYER.substring(savedPlayer.PLAYER.indexOf(' '));
        return savedPlayerLastName === lastName
      })
    }


    const takenPlayers = user.takenPlayers[position];
    let newTakenPlayers;

    const myTeam = user.myPlayers[position];
    let newMyTeam;

    //check if the last draft pick was undone. If so, delete player.
    if (totalPlayersDrafted < totalPlayersSaved) {
      user.takenPlayers.skaters = user.takenPlayers.skaters.filter(skater => {
        return skater.picked !== pick + 1
      })
      user.takenPlayers.goalies = user.takenPlayers.goalies.filter(goalie => {
        return goalie.picked !== pick + 1
      })
      req.app.io.emit('sendTakenPlayers', { data: user.takenPlayers })
      //check if undone draft pick was user pick
      if (pickArray.some(myPick => myPick - pick === 1)) {
        user.myPlayers.skaters = user.myPlayers.skaters.filter(skater => {
          return skater.picked !== pick + 1
        })
        user.myPlayers.goalies = user.myPlayers.goalies.filter(goalie => {
          return goalie.picked !== pick + 1
        })
        req.app.io.emit("sendMyPlayers", { data: user.myPlayers })
      }
    } else {
      //else add new player to database and send to frontend

      newPlayer = { ...newPlayer, picked: pick }
      newTakenPlayers = [...takenPlayers, newPlayer];
      if (newPickIsMine) {
        newMyTeam = [...myTeam, newPlayer];
        if (newMyTeam) {
          user.myPlayers[position] = newMyTeam;
        }
        req.app.io.emit("sendMyPlayers", { data: user.myPlayers })
      }

      if (newTakenPlayers) {
        user.takenPlayers[position] = newTakenPlayers;
      }
      req.app.io.emit('sendTakenPlayers', { data: user.takenPlayers })
    }

    await user.save()
    return res.status(200).json({ msg: 'got it' });
  } catch (e) {
    res.status(500).json({ error: 'Something went wrong.' })
    console.error(e)
  }
})

module.exports = playerRouter