const mongoose = require('mongoose')
const { Schema } = mongoose
const _ = require('lodash')

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
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
})

orderSchema.statics.findOrders = function(
  { orderName, retailerId, article },
  cb
) {
  const qOrderName = new RegExp(_.escapeRegExp(orderName), 'i')
  const qRetailerId = retailerId ? retailerId.replace(/\D/g, '') : { $gt: 1 }
  const qArticleNo = article
    ? new RegExp(_.escapeRegExp(article))
    : new RegExp(/.+/)
  return this.find({
    orderName: qOrderName,
    retailerId: qRetailerId,
    articleNo: qArticleNo,
    productPreviewURL: { $exists: true },
  }).limit(100)
}

orderSchema.statics.assignTeamToOrders = function(orderIds, teamId, cb) {
  return this.updateMany(
    { _id: { $in: orderIds } },
    { $set: { teamId: teamId } },
    cb
  )
}

mongoose.model('orders', orderSchema)
