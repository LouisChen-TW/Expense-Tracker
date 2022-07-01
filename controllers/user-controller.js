const User = require('../models/user')
const bcrypt = require('bcryptjs')

const userController = {
  register: async (req, res, next) => {
    try {
      const { name, email, password, confirmPassword } = req.body
      const errors = []
      if (!name || !email || !password || !confirmPassword) {
        errors.push({ message: '所有欄位都是必填的。' })
      }
      if (password !== confirmPassword) {
        errors.push({ message: '密碼與確認密碼不相符！' })
      }
      if (errors.length) {
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      const user = await User.findOne({ email: email })
      if (user) {
        errors.push({ message: '此信箱已被註冊。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      const hash = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name,
        email,
        password: hash
      })
      if (!newUser) throw new Error('建立使用者發生錯誤')
      return res.redirect('/')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController
