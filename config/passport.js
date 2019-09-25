const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {

  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})
passport.use(new FacebookStrategy({
  clientID: process.env.FB_CL_ID,
  clientSecret: process.env.FB_CL_SECRET,
  callbackURL: process.env.CB_URL
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const User = require('../models/User');
      const user = await User.findOrCreate('facebook', profile);

      const sessionUser = {
        userId: user.id,
        userName: profile.displayName
      }
      done(null, sessionUser)
    } catch (e) {
      done(e)
    }
  }
))
passport.use(new GoogleStrategy({
  clientID: process.env.GOOG_CL_ID,
  clientSecret: process.env.GOOG_CL_SECRET,
  callbackURL: process.env.GOOG_URL
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const User = require('../models/User');
      const user = await User.findOrCreate('google', profile);

      const sessionUser = {
        userId: user._id,
        userName: profile.name
      }
      done(null, sessionUser)
    } catch (e) {
      done(e)
    }
  }
))