const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }).select({
        googleId: true,
      })
      if (existingUser) {
        await existingUser.save()
        return done(null, existingUser)
      }

      const user = await new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      }).save()
      done(null, user)
    }
  )
)
