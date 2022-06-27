const Record = require('../models/record')
const Category = require('../models/category')
const QueryFeatures = require('../utils/Queryfeatures')

const recordController = {
  getAllRecords: async (req, res, next) => {
    try {
      const userId = req.user._id
      const categoryId = req.query.categoryId || ''
      let totalAmount = 0
      const queryFeatures = new QueryFeatures(
        Record.find({ userId }),
        req.query
      )
        .filter()
        .sort()

      const [categories, records] = await Promise.all([
        Category.find().lean(),
        queryFeatures.query.populate('categoryId').lean()
      ])
      records.forEach(record => (totalAmount += record.amount))
      let selectCategory = ''
      if (categoryId.length > 0) {
        selectCategory = await Category.findById(req.query.categoryId).lean()
      }
      res.render('index', {
        records,
        totalAmount,
        categories,
        categoryId,
        selectCategory
      })
    } catch (err) {
      next(err)
    }
  },
  getCreatePage: async (req, res, next) => {
    try {
      const categories = await Category.find().lean()
      return res.render('create', { categories })
    } catch (err) {
      next(err)
    }
  },
  postRecords: async (req, res, next) => {
    try {
      const userId = req.user._id
      const { name, date, categoryId, amount } = req.body
      if (!name || !date || categoryId === '' || !amount) {
        throw new Error('所有欄位都必須填寫')
      }
      const record = await Record.create({
        userId,
        name,
        date,
        categoryId,
        amount
      })
      if (!record) throw new Error('送出紀錄發生錯誤')
      return res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
  getEditPage: async (req, res, next) => {
    try {
      const _id = req.params.id
      const userId = req.user._id
      const [record, categories] = await Promise.all([
        Record.findOne({ _id, userId }).populate('categoryId').lean(),
        Category.find().lean()
      ])
      res.render('edit', { record, categories })
    } catch (err) {
      next(err)
    }
  },
  putRecords: async (req, res, next) => {
    try {
      const _id = req.params.id
      const userId = req.user._id
      const { name, date, categoryId, amount } = req.body
      const record = await Record.findByIdAndUpdate(
        { _id, userId },
        {
          name,
          date,
          categoryId,
          amount
        }
      )
      if (!record) throw new Error('編輯資料發生錯誤')
      return res.redirect('/')
    } catch (err) {
      next(err)
    }
  },
  deleteRecords: async (req, res, next) => {
    try {
      const _id = req.params.id
      const userId = req.user._id
      const record = await Record.findOneAndDelete({ _id, userId })
      if (!record) throw new Error('刪除記錄發生錯誤')
      return res.redirect('/')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = recordController
