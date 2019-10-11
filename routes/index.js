module.exports = (app) => {
  app.use('/addDraftKit', require('./addDraftKit'))
  app.use('/players', require('./players'))
  app.use('/auth', require('./auth'))
  app.use('/reset', require('./resetDraft'))
  app.use('/draftInfo', require('./draftInfo'))
};