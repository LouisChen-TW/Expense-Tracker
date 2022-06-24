const passport = require('passport')
const local = require('./passport/local')
const facebook = require('./passport/facebook')
const User = require('../models/user')

// user Strategy
passport.use(local)
passport.use(facebook)

// setting serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// setting deserialize
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean()
    return done(null, user)
  } catch (err) {
    done(err, null)
  }
})

module.exports = passport
