const goalieRouter = require('express').Router();

goalieRouter.get('/', (req, res, next) => {
  const goalies = require('../data/goalies.json');
  res.status(200).json(goalies)
})

module.exports = goalieRouter;