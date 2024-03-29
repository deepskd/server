const mongoose = require('mongoose')
const { Schema } = mongoose
const _ = require('lodash')

const teamSchema = new Schema({
  name: String,
  mascot: String,
  city: String,
  state: String,
  zip: String,
  address: String,
  colors: [String],
  type: String,
  country: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
})

teamSchema.statics.findByNameState = function(q, cb) {
  const input = q ? q.split(',') : ''

  if (!input) {
    return
  }
  const schoolName = _.escapeRegExp(input[0])
  const state = input[1]
    ? input[1]
        .trim()
        .substring(0, 2)
        .replace(/[^a-z]/i, '')
    : ''

  if (!schoolName) {
    return {}
  }

  return this.find(
    { name: new RegExp(schoolName, 'i'), state: new RegExp(state, 'i') },
    { name: 1, mascot: 1, city: 1, state: 1 },
    cb
  ).limit(20)
}

teamSchema.statics.getTeam = function(_id, cb) {
  return this.findById(_id, 'name colors city state mascot', cb)
}

mongoose.model('teams', teamSchema)
