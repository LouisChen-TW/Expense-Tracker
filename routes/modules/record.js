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

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then((record) => {
      res.render('edit', { record })
    })
    .catch((err) => console.log(err))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  const newRecord = req.body
  return Record.findOneAndUpdate({ _id }, newRecord)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err))
})

module.exports = router
