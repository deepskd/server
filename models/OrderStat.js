const mongoose = require('mongoose')
const { Schema } = mongoose

const orderStatSchema = new Schema({
  retailerID: Number,
  company: String,
  retailerType: String,
  sapSoldtoID: String,
  retailerType: String,
  orderCount: String,
  customerCount: String,
  country: String,
  statDate: Date,
})

orderStatSchema.statics.findByCountry = async function({
  country,
  retailerType,
  activePage,
}) {
  const query = {
    country,
    retailerType: { $in: retailerType },
  }
  const count = await this.find(query).countDocuments()

  let skipCount = activePage ? (activePage - 1) * 20 : 0

  const data = await this.find(query)
    .sort({ orderCount: -1 })
    .skip(skipCount)
    .limit(20)

  return {
    count,
    data,
  }
}

mongoose.model('orderstats', orderStatSchema)
