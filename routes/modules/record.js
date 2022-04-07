const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const record = req.body
  const userId = '624e5da57271e574ff41c2a9'
  record.userId = userId
  Category.findOne({ name: record.category })
    .lean()
    .then((category) => {
      record.categoryId = category._id
      return Record.create(record)
    })
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
