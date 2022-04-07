const db = require('../../config/mongoose')
const Category = require('../category')

const SEED_CATEGORY = require('./SEED_CATEGORY.json')

db.once('open', () => {
  Promise.all(
    Array.from(SEED_CATEGORY, (seedCategory) => {
      return Category.create(seedCategory)
    })
  )
    .then(() => {
      console.log('categorySeeder done.')
      db.close()
    })
    .catch((error) => console.log(error))
    .finally(() => process.exit())
})
