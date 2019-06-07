const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");

const orderSchema = new Schema({
  orderDate: Date,
  orderId: Number,
  orderNo: String,
  orderName: String,
  retailerId: Number,
  orderLineId: Number,
  articleNo: String,
  ibFactory: String,
  productPreviewURL: String,
  teamId: { type: Schema.Types.ObjectId, ref: "Team" }
});

orderSchema.statics.findByOrderName = function(orderName, cb) {
  const qOrderName = new RegExp(_.escapeRegExp(orderName), "i");
  return this.find({
    orderName: qOrderName,
    productPreviewURL: { $exists: true }
  });
};

orderSchema.statics.assignTeamToOrders = function(orderIds, teamId, cb) {
  return this.updateMany(
    { _id: { $in: orderIds } },
    { $set: { teamId: teamId } },
    cb
  );
};

mongoose.model("orders", orderSchema);
