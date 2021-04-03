const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Goal = require("../models/goal");
const User = require("../models/user");

exports.add_goal = (req, res, next) => {
  const goal = new Goal({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    startTime: Date.now(),
    category: req.body.category,
    frequency: req.body.frequency,
    period: req.body.period,
    publicity: req.body.publicity,
    timespan: req.body.timespan,
    progress: 0,
  });
  goal.save(function (err) {
    if (err) {
      return res.status(400).json({
        Error: err,
      });
    }
  });
  User.updateOne(
    { _id: req.userData.userId },
    { $push: { onGoingGoals: goal._id } }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Goal added",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.update_goal = (req, res, next) => {
  var update_item = {};
  if (req.body.title != null) {
    update_item.title = req.body.title;
  }
  if (req.body.category != null) {
    update_item.category = req.body.category;
  }
  if (req.body.frequency != null) {
    update_item.frequency = req.body.frequency;
  }
  if (req.body.period != null) {
    update_item.period = req.body.period;
  }
  if (req.body.publicity != null) {
    update_item.publicity = req.body.publicity;
  }
  if (req.body.timespan != null) {
    update_item.timespan = req.body.timespan;
  }
  if (req.body.progress != null) {
    update_item.progress = req.body.progress;
  }
  console.log(update_item);
  const goal = Goal.findByIdAndUpdate(req.body.id, update_item)
    .then(() => {
      res.status(200).json({
        message: "Goal updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.remove_goal = (req, res, next) => {
  User.updateOne(
    { _id: req.userData.userId },
    { $pull: { onGoingGoals: req.body.id } }
  )
    .exec()
    .then(() => {
      Goal.findByIdAndDelete(req.body.id).exec();
    })
    .then(() => {
      res.status(200).json({
        message: "Goal deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.read_all_goal = (req, res, next) => {
  User.findOne({ _id: req.userData.userId })
    .populate("Goal")
    .exec((err, user) => {
      if (err)
        return res.status(500).json({
          Error: err,
        });
      return res.status(200).end(JSON.stringify(user.onGoingGoals));
    });
};

exports.check_in = (req, res, next) => {
  var S = req.session;
  const id = req.body.goal_id;
  if (S[id]) {
    S[id] += 1;
  } else {
    S[id] = 1;
  }
  return res.status(200).json({ data: S });
};

exports.get_all_public_goal = (req, res, next) => {
  Goal.find({ publicity: true })
    .then((result) => {
      res.status(200).json({
        data: JSON.stringify(result),
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};
