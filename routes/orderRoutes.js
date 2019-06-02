require("../models/Order");
const mongoose = require("mongoose");

const Order = mongoose.model("orders");

module.exports = app => {
  app.get("/api/orders", async (req, res) => {
    const orders = await Order.findByOrderName(req.query.orderName);

    res.status(200).send(orders);
  });
};
