module.exports = (app) => {
  app.use('/getSkaters', require('./getSkaters'))
  app.use('/getGoalies', require('./getGoalies'))
  app.use('/addDraftKit', require('./addDraftKit'))
  app.use('/players', require('./players'))
  app.use('/auth', require('./auth'))
  app.use('/stream', require('./stream'))
};