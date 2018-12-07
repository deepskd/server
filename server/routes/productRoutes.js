const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
require("../models/Team");

const Team = mongoose.model("teams");

var products = {};
try {
  products = yaml.safeLoad(fs.readFileSync("product.yml", "utf8"));
} catch (e) {
  console.log(e);
}

module.exports = app => {
  app.get("/api/products/", async (req, res) => {
    const colors = await Team.getColorsforSchool(req.query.id);
    console.log(colors);
    res.send(products);
  });
};
