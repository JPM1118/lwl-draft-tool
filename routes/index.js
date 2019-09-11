module.exports = (app) => {
  app.use('/getSkaters', require('./getSkaters'))
  app.use('/getGoalies', require('./getGoalies'))
  app.use('/addDraftKit', require('./addDraftKit'))
  app.use('/refreshPlayerList', require('./refreshPlayerList'))
};