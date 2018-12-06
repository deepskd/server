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
  return this.find(
    { name: new RegExp(name, "i") },
    { name: 1, mascot: 1, city: 1, state: 1 },
    cb
  ).limit(20);
};

mongoose.model("teams", teamSchema);
