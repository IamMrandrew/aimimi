const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const goalSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdBy: { type: String },
  title: { type: String, required: true },
  category: String,
  startTime: { type: Date, required: true },
  frequency: { type: Number, require: true },
  period: { type: String, required: true, enum: ["Daily, Weekly"] },
  timespan: { type: Number, required: true },
  publicity: { type: Boolean, requied: true },
});
module.exports = mongoose.model("Goal", goalSchema);
