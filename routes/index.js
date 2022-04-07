const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth')

const home = require('./modules/home')
const record = require('./modules/record')
const user = require('./modules/user')

router.use('/user', user)
router.use('/record', authenticator, record)
router.use('/', authenticator, home)

module.exports = router
