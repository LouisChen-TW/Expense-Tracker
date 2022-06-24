const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { email, name } = profile._json
      const existUser = await User.findOne({ email })
      if (existUser) return done(null, existUser)
      const randomPassword = Math.random().toString(36).slice(-8)
      const hash = await bcrypt.hash(randomPassword, 10)
      const newUser = await User.create({ name, email, password: hash })
      done(null, newUser)
    } catch (err) {
      done(err, false)
    }
  }
)
