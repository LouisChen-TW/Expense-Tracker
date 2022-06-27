const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const passport = require('./config/passport')
const routes = require('./routes')
const handlebarHelper = require('./utils/handlebarHelper')
const app = express()
const PORT = process.env.PORT || 3000

require('./config/mongoose')

app.engine(
  'hbs',
  exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: handlebarHelper })
)
app.set('view engine', 'hbs')

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.error = req.flash('error')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is listening on localhost:${PORT}`)
})
