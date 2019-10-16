const routes = require('express').Router();

routes.use('/addDraftKit', require('./addDraftKit'))
routes.use('/players', require('./players'))
routes.use('/auth', require('./auth'))
routes.use('/reset', require('./resetDraft'))
routes.use('/draftInfo', require('./draftInfo'))

module.exports = routes