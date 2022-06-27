const Record = require('../models/record')
const Category = require('../models/category')
const QueryFeatures = require('../utils/Queryfeatures')

const homeController = {
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

      res.render('index', { records, totalAmount, categories, categoryId })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = homeController
