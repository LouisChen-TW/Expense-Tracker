const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/user')
const bcrypt = require('bcryptjs')

module.exports = new LocalStrategy(
  { usernameField: 'email', passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const user = await User.findOne({ email })
      if (!user) return done(null, false, req.flash('error', '此信箱尚未註冊'))
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch)
        return done(null, false, req.flash('error', '信箱或是密碼錯誤'))
      return done(null, user)
    } catch (err) {
      done(err, false)
    }
  }
)
