const express = require('express')
const router = express.Router()
const passport = require('passport')
const userController = require('../../controllers/user-controller')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash: true
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', userController.register)

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已經成功登出！')
  res.redirect('/user/login')
})

module.exports = router
