const draftPickRouter = require('express').Router();
const User = require('../models/User');

draftPickRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId)
    user.draftPick = req.body.value
    await user.save();
    res.status(200).end()
  } catch (error) {
    console.error(error)
  }

})

module.exports = draftPickRouter