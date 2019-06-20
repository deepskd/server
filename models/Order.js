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

orderSchema.statics.findOrders = async function(
  { orderName, retailerId, article, activePage },
  cb
) {
  const qOrderName = new RegExp(_.escapeRegExp(orderName), 'i')
  const qRetailerId = retailerId ? retailerId.replace(/\D/g, '') : { $gt: 1 }
  const qArticleNo = article
    ? new RegExp(_.escapeRegExp(article))
    : new RegExp(/.+/)

  const count = await this.find({
    orderName: qOrderName,
    retailerId: qRetailerId,
    articleNo: qArticleNo,
    productPreviewURL: { $exists: true },}).countDocuments();

  let skipCount = activePage ? (activePage - 1) * 32 : 0
   
  const data = await this.find({
    orderName: qOrderName,
    retailerId: qRetailerId,
    articleNo: qArticleNo,
    productPreviewURL: { $exists: true },
  }, 'id productPreviewURL articleNo orderName').skip(skipCount).limit(32)

  return {
      count,
      data
    }
}

orderSchema.statics.assignTeamToOrders = function(orderIds, teamId, cb) {
  return this.updateMany(
    { _id: { $in: orderIds } },
    { $set: { teamId: teamId } },
    cb
  )
}

mongoose.model('orders', orderSchema)
