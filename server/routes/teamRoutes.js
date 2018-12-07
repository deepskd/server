const mongoose = require("mongoose");
require("../models/Team");
const Team = mongoose.model("teams");

module.exports = app => {
  app.get("/api/teams", async (req, res) => {
    const teams = await Team.findByNameState(req.query.q);
    console.log(teams);
    res.send(teams);
  });

  app.get("api/team", async (req, res) => {
    const colors = await Team.getColorsforSchool(req.query.id);
    res.send(colors);
  });
};
