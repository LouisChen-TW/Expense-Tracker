const GoogleStrategy = require('passport-google-oauth20')
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const { email, name } = profile._json
      const existUser = await User.findOne({ email })
      if (existUser) return cb(null, existUser)
      const randomPassword = Math.random().toString(36).slice(-8)
      const hash = await bcrypt.hash(randomPassword, 10)
      const newUser = await User.create({ name, email, password: hash })
      cb(null, newUser)
    } catch (err) {
      cb(err, false)
    }
  }
)
