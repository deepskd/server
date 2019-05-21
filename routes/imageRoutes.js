require("../models/Image");
const mongoose = require("mongoose");

const Image = mongoose.model("images");

module.exports = app => {
  app.get("/api/images", async (req, res) => {
    const images = await Image.findByRetailerId(req.query.retailerId);
    res.status(200).send(images);
  });

  app.get("/api/retailerImageCount", async (req, res) => {
    const imageStats = await Image.retailerImageCount();
    res.status(200).send(imageStats);
  });

  app.patch("/api/images", async (req, res) => {
    console.log(req.body);
    const updates = await Image.assignTeamToImages(
      req.body.selectedImageIds,
      req.body.teamId
    );
    res.status(200).send({ message: "Records Updated", meta: updates });
  });
};
