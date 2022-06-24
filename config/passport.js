const passport = require('passport')
const local = require('./passport/local')
const facebook = require('./passport/facebook')
const google = require('./passport/google')
const User = require('../models/user')

// user Strategy
passport.use(local)
passport.use(facebook)
passport.use(google)

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
