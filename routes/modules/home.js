const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Record.find({ userId })
    .populate('categoryId')
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      let totalAmount = 0
      records.forEach((record) => (totalAmount += record.amount))
      res.render('index', { records, totalAmount })
    })
    .catch((err) => console.log(err))
})

module.exports = router
