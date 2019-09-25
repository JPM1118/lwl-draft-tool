const draftKitRouter = require('express').Router()
const User = require('../models/User');

draftKitRouter.post('/', async (req, res, next) => {
  try {
    console.log("received")
    const { type } = req.body.data;
    const { playerData } = req.body.data;
    const user = await User.findById('5d8abd87179c4644506f1331')
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