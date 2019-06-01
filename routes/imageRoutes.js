require("../models/Image");
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

const Image = mongoose.model("images");

module.exports = app => {
  app.get("/api/images", async (req, res) => {
    let images = [];
    if (req.query.retailerId) {
      images = await Image.findByRetailerId(req.query.retailerId);
    } else if (req.query.teamId) {
      images = await Image.findByTeamId(req.query.teamId);
    }
    res.status(200).send(images);
  });

  app.get("/api/retailerImageCount", requireLogin, async (req, res) => {
    const imageStats = await Image.retailerImageCount();
    res.status(200).send(imageStats);
  });

  app.get("/api/teamImageCount", requireLogin, async (req, res) => {
    const imageStats = await Image.teamImageCount();
    res.status(200).send(imageStats);
  });

  app.patch("/api/images", requireLogin, async (req, res) => {
    const updates = await Image.assignTeamToImages(
      req.body.selectedImageIds,
      req.body.teamId
    );
    res.status(200).send({ message: "Records Updated", meta: updates });
  });
};
