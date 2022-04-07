const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Record.find()
    .populate('categoryId')
    .lean()
    .then((records) => {
      let totalAmount = 0
      records.forEach((record) => (totalAmount += record.amount))
      res.render('index', { records, totalAmount })
    })
    .catch((err) => console.log(err))
})

module.exports = router
