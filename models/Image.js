const mongoose = require('mongoose')
const { Schema } = mongoose

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
    crestName: String,
  },
})

imageSchema.statics.findByRetailerId = async function(retailerId, activePage, cb) {
  const count = await this.find({
    retailerId: retailerId, teamId: { $exists: false } 
  }).countDocuments();

  let skipCount = activePage ? (activePage - 1) * 24 : 0

  const data = await this.find(
    { retailerId: retailerId, teamId: { $exists: false } },
  ).skip(skipCount).limit(24)

  return {
    count,
    data
  }
}

imageSchema.statics.retailerImageCount = function(
  country = 'US',
  sort = 1,
  cb
) {
  return this.aggregate([
    {
      $match: {
        teamId: { $exists: false },
        'meta.orderNo': new RegExp(`^MIAD2${country}`, 'i'),
      },
    },
    { $group: { _id: '$retailerId', count: { $sum: 1 } } },
    { $sort: { count: Number.parseInt(sort) } },
  ])
}

imageSchema.statics.assignTeamToImages = function(imageIds, teamId, cb) {
  return this.updateMany(
    { _id: { $in: imageIds } },
    { $set: { teamId: teamId } },
    cb
  )
}

imageSchema.statics.teamImageCount = function(cb) {
  return this.aggregate([
    { $match: { teamId: { $exists: true } } },
    { $group: { _id: '$teamId', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    {
      $lookup: {
        from: 'teams',
        localField: '_id',
        foreignField: '_id',
        as: 'team',
      },
    },
    {
      $replaceRoot: {
        newRoot: { $mergeObjects: [{ $arrayElemAt: ['$team', 0] }, '$$ROOT'] },
      },
    },
    { $project: { fromItems: 0 } },
  ])
}

imageSchema.statics.findByTeamId = function(teamId, cb) {
  return this.find({ teamId: teamId }, cb)
}

mongoose.model('images', imageSchema)
