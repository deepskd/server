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

teamSchema.statics.findByNameState = function(q, cb) {
  const input = q.split(",");
  const schoolName = input[0].trim().replace(/([^\w\s+*:;,.()/\\]+)/gi, "");
  const state = input[1]
    ? input[1]
        .trim()
        .substring(0, 2)
        .replace(/[^a-z]/, "")
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

mongoose.model("teams", teamSchema);
