const mongoose = require("mongoose");
const { Schema } = mongoose;

const teamSchema = new Schema({
  name: String,
  mascot: String,
  city: String,
  state: String,
  zip: String,
  address: String,
  colors: [String]
});

teamSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, "i") }, cb);
};

const Team = mongoose.model("teams", teamSchema);
