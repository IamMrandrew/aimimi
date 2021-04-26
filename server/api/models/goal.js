const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//for storing a general goal's information
const goalSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdBy: { type: Schema.Types.ObjectId, ref: "User", require: true },
  title: { type: String, required: true },
  category: String,
  startTime: { type: Date, required: true },
  frequency: { type: Number, require: true },
  period: { type: String, required: true, enum: ["Daily", "Weekly"] },
  timespan: { type: Number, required: true },
  publicity: { type: Boolean, requied: true },
});
module.exports = mongoose.model("Goal", goalSchema);
