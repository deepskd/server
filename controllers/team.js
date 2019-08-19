const mongoose = require('mongoose')
const Team = mongoose.model('teams')

exports.create = async (req, res) => {
  const { name, mascot, colors, city, state, country, zip, type } = req.body
  let { user } = req

  if (process.env.NODE_ENV !== 'production') {
    user = await mongoose.model('users').findById('5d1b9dbe9b4bdd27fcf8b7c1')
  }

  if (!name || !mascot || colors.length === 0 || !user) {
    return res.status(422).send({ error: 'Please send all required fields' })
  }

  const team = await new Team({
    name,
    mascot,
    colors,
    city,
    state,
    country,
    zip,
    type,
    createdBy: user._id,
  }).save()

  res.send(team)
}

exports.getTeams = async (req, res) => {
  let { user } = req
  if (process.env.NODE_ENV !== 'production') {
    user = await mongoose.model('users').findById('5d1b9dbe9b4bdd27fcf8b7c1')
  }

  const teams = await Team.find(
    { createdBy: user._id },
    'name mascot city state'
  )
  res.send(teams)
}
