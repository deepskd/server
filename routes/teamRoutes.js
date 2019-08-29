const mongoose = require('mongoose')
require('../models/Team')
const Team = mongoose.model('teams')
const requireLogin = require('../middlewares/requireLogin')
const TeamController = require('../controllers/team')

module.exports = app => {
  app.get('/api/teams', async (req, res) => {
    const teams = await Team.findByNameState(req.query.q)
    res.status(200).send(teams)
  })

  app.get('/api/team', async (req, res) => {
    const team = await Team.getTeam(req.query.id)
    res.status(200).send(team)
  })

  app.get('/api/v2/teams', requireLogin, TeamController.getTeams)
  app.get('/api/v2/teams/:team_id', requireLogin, TeamController.getTeam)

  app.post('/api/teams', requireLogin, TeamController.create)
}
