const db = require('../../config/mongoose')

const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const SEED_USER = require('./SEED_USER.json')
const SEED_RECORD = require('./SEED_RECORD.json')

db.once('open', async () => {
  try {
    for (const seedUser of SEED_USER) {
      const user = await User.findOne({ email: seedUser.email }).lean()
      for (const seedRecord of SEED_RECORD) {
        const category = await Category.findOne({
          name: seedRecord.category
        }).lean()
        await Record.create({
          name: seedRecord.name,
          date: seedRecord.date,
          amount: seedRecord.amount,
          userId: user._id,
          categoryId: category._id
        })
      }
    }
    console.log('SEED_RECORD done')
    db.close()
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
