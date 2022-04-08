const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Category.find() // for display all category in home page
    .lean()
    .then((categories) => {
      return Record.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ date: 'desc' })
        .then((records) => {
          let totalAmount = 0
          records.forEach((record) => (totalAmount += record.amount))
          res.render('index', { records, totalAmount, categories })
        })
        .catch((err) => console.log(err))
    })
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const selectCategoryId = req.body.categoryId
  if (selectCategoryId) {
    Category.find({ _id: { $ne: selectCategoryId } })
      .lean()
      .then((notSelectCategory) => {
        Category.findById(selectCategoryId)
          .lean()
          .then((selectCategory) => {
            return Record.find({ userId, categoryId: selectCategoryId })
              .populate('categoryId')
              .lean()
              .then((selectRecords) => {
                let totalAmount = 0
                selectRecords.forEach(
                  (selectRecord) => (totalAmount += selectRecord.amount)
                )
                res.render('index', {
                  selectRecords,
                  totalAmount,
                  notSelectCategory,
                  selectCategory,
                })
              })
          })
      })
  } else {
    res.redirect('/')
  }
})

module.exports = router
