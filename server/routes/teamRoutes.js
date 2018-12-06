const mongoose = require("mongoose");
require("../models/Team");
const Team = mongoose.model("teams");

module.exports = app => {
  app.get("/api/teams", async (req, res) => {
    console.log(req.query.name);
    const teams = await Team.findByName(req.query.name);
    console.log(teams);
    res.send(teams);
  });
};
