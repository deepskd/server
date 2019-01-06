const mongoose = require("mongoose");
require("../models/Team");
const Team = mongoose.model("teams");

module.exports = app => {
  app.get("/api/teams", async (req, res) => {
    const teams = await Team.findByNameState(req.query.q);
    res.status(200).send(teams);
  });

  app.get("/api/team", async (req, res) => {
    const team = await Team.getTeam(req.query.id);
    res.status(200).send(team);
  });
};
