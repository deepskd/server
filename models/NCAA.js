const mongoose = require("mongoose");
const { Schema } = mongoose;

const ncaaSchema = new Schema({
  name: String,
  mascot: String,
  city: String,
  state: String,
  colors: [String]
});

ncaaSchema.statics.findByNameState = function(q, cb) {
  const input = q ? q.split(",") : "";

  if (!input) {
    return;
  }
  const schoolName = input[0].trim().replace(/([^\w\s+*:;,.()/\\]+)/gi, "");
  const state = input[1]
    ? input[1]
        .trim()
        .substring(0, 2)
        .replace(/[^a-z]/i, "")
    : "";

  if (!schoolName) {
    return {};
  }

  return this.find(
    { name: new RegExp(schoolName, "i"), state: new RegExp(state, "i") },
    { name: 1, mascot: 1, city: 1, state: 1 },
    cb
  ).limit(20);
};

ncaaSchema.statics.find20 = function(cb) {
  console.log("here");
  return this.find({ mascot: "Zips" }, cb);
};

ncaaSchema.statics.getTeam = function(_id, cb) {
  return this.findById(_id, "name colors city state mascot", cb);
};

mongoose.model("ncaa", ncaaSchema);
