const draftKitRouter = require('express').Router()

draftKitRouter.post('/', (req, res, next) => {
  try {
    res.status(200).send('Temp Response.')
  } catch (e) {
    console.error(e)
    next(e)
  }
})

module.exports = draftKitRouter;