const authRouter = require('express').Router();
const passport = require('passport');

authRouter.get('/facebook', passport.authenticate('facebook'));
authRouter.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

module.exports = authRouter