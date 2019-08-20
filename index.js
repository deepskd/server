require('newrelic')

const express = require('express')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')
const formData = require('express-form-data')
const passport = require('passport')
const keys = require('./config/keys')

require('./services/mongo')
require('./services/cloudinary')
require('./models/User')
require('./services/passport')
require('./models/Team')

const app = express()
app.use(bodyParser.json())
app.use(formData.parse())

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

require('./routes/teamRoutes')(app)
require('./routes/productRoutes')(app)
require('./routes/imageRoutes')(app)
require('./routes/authRoutes')(app)
require('./routes/orderRoutes')(app)
require('./routes/orderStatRoutes')(app)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  const path = require('path')
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT)
