const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
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
      const user = await User.findOrCreate(profile);
      const sessionUser = {
        userId: user.id,
        userName: profile.first_name
      }
      done(null, sessionUser)
    } catch (e) {
      done(e)
    }
  }
))