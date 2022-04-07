const express = require('express')
const router = express.Router()
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/user/login')
})

module.exports = router
