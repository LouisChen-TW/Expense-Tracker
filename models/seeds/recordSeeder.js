const db = require('../../config/mongoose')

const Record = require('../record')
const User = require('../user')
const Category = require('../category')

const SEED_USER = require('./SEED_USER.json')
const SEED_RECORD = require('./SEED_RECORD.json')

const bcrypt = require('bcryptjs')

db.once('open', () => {
  SEED_USER.forEach((seedUser) => {
    User.findOne({ email: seedUser.email })
      .then((user) => {
        if (user) return user
        return bcrypt
          .genSalt(10)
          .then((salt) => bcrypt.hash(seedUser.password, salt))
          .then((hash) =>
            User.create({
              name: seedUser.name,
              email: seedUser.email,
              password: hash,
            })
          )
      })
      .then((user) => {
        return Promise.all(
          Array.from(SEED_RECORD, (seedRecord) => {
            return Category.findOne({ name: seedRecord.category })
              .lean()
              .then((category) => {
                return Record.create({
                  name: seedRecord.name,
                  date: seedRecord.date,
                  amount: seedRecord.amount,
                  userId: user._id,
                  categoryId: category._id,
                })
              })
          })
        )
      })
      .then(() => {
        console.log('SEED_USER & SEED_RECORD complete')
        db.close()
      })
      .catch((err) => console.log(err))
      .finally(() => process.exit())
  })
})
