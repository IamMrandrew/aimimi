const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const onGoingGoalsSchema = Schema({
  goal_id: { type: String },
  join_time: { type: Date },
  progress: { type: Number },
  check_in: { type: Number },
  check_in_successful_time: { type: Number },
  accuracy: { type: Number },
});
const userSchema = Schema({
  _id: mongoose.Schema.Types.ObjectId,
  randomString: { type: String, unique: true },
  isValid: { type: Boolean },
  role: { type: String, enum: ["User", "Admin"] },
  username: { type: String, required: true },
  propic: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  joinDate: { type: Date, default: Date.now },
  completedGoals: [{ type: Schema.Types.ObjectId, ref: "Goal" }],
  onGoingGoals: [onGoingGoalsSchema], // for storing goals information specific for each user
});

module.exports = mongoose.model("User", userSchema);
