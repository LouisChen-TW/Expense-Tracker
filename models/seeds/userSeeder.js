const db = require('../../config/mongoose')
const User = require('../user')
const SEED_USER = require('./SEED_USER.json')
const bcrypt = require('bcryptjs')

db.once('open', async () => {
  try {
    for (const seedUser of SEED_USER) {
      const existUser = await User.findOne({ email: seedUser.email })
      if (!existUser) {
        const hash = await bcrypt.hash(seedUser.password, 10)
        await User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        })
      }
    }
    console.log('SEED_USER done')
    db.close()
    process.exit()
  } catch (err) {
    console.error(err)
  }
})
