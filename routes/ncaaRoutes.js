const mongoose = require("mongoose");
require("../models/NCAA");
const ncaa = mongoose.model("ncaa");

module.exports = app => {
  app.get("/api/ncaa/teams", async (req, res) => {
    const teams = await ncaa.findByNameState(req.query.q);
    res.status(200).send(teams);
  });

  app.get("/api/ncaa/team", async (req, res) => {
    const team = await ncaa.getTeam(req.query.id);
    res.status(200).send(team);
  });
};
