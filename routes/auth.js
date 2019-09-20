const authRouter = require('express').Router();
const passport = require('passport');
require('dotenv').config()


authRouter.get('/loggedIn', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).send('You are logged in!')
  } else {
    res.status(500).send('You are NOT logged in')
  }
})

authRouter.get('/facebook', passport.authenticate('facebook'));
authRouter.get('/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `${process.env.FRONT_URL}`,
    failureRedirect: `${process.env.FRONT_URL}`
  }));

authRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));
authRouter.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: `${process.env.FRONT_URL}`,
    failureRedirect: `${process.env.FRONT_URL}`
  }));

authRouter.get('/logout', (req, res, next) => {
  req.logout()
  res.status(200).send('You have been logged out.')
})

module.exports = authRouter

