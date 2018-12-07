const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
require("../models/Team");

const Team = mongoose.model("teams");

const products = {};
try {
  products = yaml.safeLoad(fs.readFileSync("../product/product.yml", "utf8"));
  console.log(products);
} catch (e) {
  console.log(e);
}

module.exports = app => {
  app.get("/api/products/", async (req, res) => {
    res.send(products);
  });
};
