const mongoose = require("mongoose");
const { Schema } = mongoose;

const imageSchema = new Schema({
  retailerId: Number,
  previewImageURL: String,
  teamId: Schema.Types.ObjectId,
  meta: {
    orderDate: Date,
    orderId: Number,
    orderNo: String,
    orderName: String,
    orderLineId: Number,
    ibOrderNo: String,
    miKitBagModelId: Number,
    miKitBagId: Number,
    miModelPartIdEnt: String,
    miGraphicDetailId: Number,
    factoryURL: String,
    crestColorDocPath: String,
    crestName: String
  }
});

imageSchema.statics.findByRetailerId = function(retailerId, cb) {
  return this.find({ retailerId: retailerId }, cb).limit(50);
};

imageSchema.statics.retailerImageCount = function(cb) {
  return this.aggregate([
    { $group: { _id: "$retailerId", count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

imageSchema.statics.assignTeamToImages = function(imageIds, teamId, cb) {
  return this.updateMany(
    { _id: { $in: imageIds } },
    { $set: { teamId: teamId } },
    cb
  );
};

mongoose.model("images", imageSchema);
