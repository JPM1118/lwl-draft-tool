const draftKitRouter = require('express').Router()
const _parseFloat = require('../utilities/_parseFloat');
const User = require('../models/User');

draftKitRouter.post('/', async (req, res, next) => {
  try {
    const { skaters } = req.body
    const { goalies } = req.body

    const user = await User.findById(req.user.userId)
    user.players.skaters = _parseFloat(skaters)
    user.players.goalies = _parseFloat(goalies)
    const newUser = await user.save()
    //populate frontend with new players
    req.app.io.emit("sendPlayers", newUser.players)
    res.status(200).send('updated.')
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = draftKitRouter;