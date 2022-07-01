const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const record = require('./modules/record')
const user = require('./modules/user')
const auth = require('./modules/auth')

router.use('/user', user)
router.use('/auth', auth)
router.use('/record', authenticator, record)
router.use('/', authenticator, home)

router.all('*', (req, res) => {
  res.render('error', { site: req.originalUrl })
})

module.exports = router
