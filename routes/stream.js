const streamRouter = require('express').Router();

streamRouter.get('/', (req, res, next) => {
  res.sseSetup();
  res.sseSend('Hello World!')
})

module.exports = streamRouter;