const db = require('../../config/mongoose')
const Category = require('../category')

const SEED_CATEGORY = require('./SEED_CATEGORY.json')

db.once('open', async () => {
  try {
    for (const seedCategory of SEED_CATEGORY) {
      const existCategory = await Category.findOne({ name: seedCategory.name })
      if (!existCategory) await Category.create(seedCategory)
    }
    console.log('SEED_CATEGORY done.')
    db.close()
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
