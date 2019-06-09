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

imageSchema.statics.findByRetailerId = function(retailerId, cb) {
  return this.find(
    { retailerId: retailerId, teamId: { $exists: false } },
    cb
  ).limit(50)
}

imageSchema.statics.retailerImageCount = function(cb) {
  return this.aggregate([
    { $match: { teamId: { $exists: false } } },
    { $group: { _id: '$retailerId', count: { $sum: 1 } } },
    { $sort: { count: 1 } },
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
