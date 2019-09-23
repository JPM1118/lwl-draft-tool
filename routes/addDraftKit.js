const draftKitRouter = require('express').Router()
const User = require('../models/User');

draftKitRouter.post('/', async (req, res, next) => {
  try {
    console.log("received")
    const { type } = req.body.data;
    const { playerData } = req.body.data;
    const user = await User.findById("5d840ce754add80c301a4e73")
    if (type === 'skaters') {
      user.skaters.push(...playerData)
      await user.save()
    } else {
      user.goalies.push(...playerData);
      await user.save()
    }
    res.status(200).send('updated.')
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = draftKitRouter;