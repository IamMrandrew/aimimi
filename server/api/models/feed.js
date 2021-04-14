const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  creator: { type: Schema.Types.ObjectId, ref: "User", require: true },
  created_time: { type: Date, require: true },
  like: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, require: true },
});
const feedSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  goal_id: { type: Schema.Types.ObjectId, ref: "Goal", require: true },
  creator: { type: Schema.Types.ObjectId, ref: "User", require: true },
  participant: [{ type: Schema.Types.ObjectId, ref: "User" }],
  created_time: { type: Date, require: true },
  like: [{ type: Schema.Types.ObjectId, ref: "User" }],
  content: { type: String, require: true },
  comment: [commentSchema],
});

module.exports = mongoose.model("Feed", feedSchema);
