module.exports = (app) => {
  app.use('/getSkaters', require('./getSkaters'))
  app.use('/getGoalies', require('./getGoalies'))
};