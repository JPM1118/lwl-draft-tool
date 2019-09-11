const skaterRouter = require('express').Router();
const updatePlayerList = require('../helpers/updatePlayerList')

skaterRouter.get('/', (req, res, next) => {
  try {
    const skaters = require('../data/skaters.json');
    const updatedSkaters = updatePlayerList(skaters)
    res.status(200).json(updatedSkaters)
  } catch (e) {
    console.error(e);
    next(e)
  }
})

module.exports = skaterRouter;