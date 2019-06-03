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
  productPreviewURL: String
});

orderSchema.statics.findByOrderName = function(orderName, cb) {
  const qOrderName = new RegExp(_.escapeRegExp(orderName), "i");
  return this.find({
    orderName: qOrderName,
    productPreviewURL: { $exists: true }
  });
};

mongoose.model("orders", orderSchema);
