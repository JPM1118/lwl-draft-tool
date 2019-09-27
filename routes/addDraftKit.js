const draftKitRouter = require('express').Router()
const User = require('../models/User');

draftKitRouter.post('/', async (req, res, next) => {
  try {
    console.log("received")
    const { type } = req.body.data;
    const { playerData } = req.body.data;
    const user = await User.findById('5d8e3b3905fe453220af7f67')
    if (type === 'skaters') {
      user.players.skaters.push(...playerData)
      await user.save()
    } else {
      user.players.goalies.push(...playerData);
      await user.save()
    }
    res.status(200).send('updated.')
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = draftKitRouter;