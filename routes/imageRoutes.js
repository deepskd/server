require("../models/Image");
const mongoose = require("mongoose");

const Image = mongoose.model("images");

module.exports = app => {
  app.get("/api/images", async (req, res) => {
    const images = await Image.findByRetailerId(req.query.retailerId);
    res.status(200).send(images);
  });
};
