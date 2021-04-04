const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const GoalsSchema = require("./goal");

const userSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  completedGoals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  onGoingGoals: {
    type: Map,
    of: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
