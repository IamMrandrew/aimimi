const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schedule = require("node-schedule");

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
    {
      $push: {
        onGoingGoals: {
          goal_id: goal._id,
          join_time: Date.now(),
          progress: 0,
          check_in: 0,
          check_in_successful_time: 0,
          accuracy: 0,
        },
      },
    }
  )
    .exec()
    .then(() => {
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
  User.updateMany(
    {},
    { $pull: { "onGoingGoals.$.goal_id": req.params.goal_id } },
    { multi: true }
  )
    .exec()
    .then(() => {
      Goal.findByIdAndDelete(req.params.goal_id).exec();
    })
    .then(() => {
      res.status(200).json({
        message: "Goal removed",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.quit_goal = (req, res, next) => {
  User.updateOne(
    { _id: req.userData.userId },
    { $pull: { "onGoingGoals.$.goal_id": req.params.goal_id } }
  )
    .exec()
    .then(() => {
      res.status(200).json({
        message: "Goal quited",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.read_all_goal = (req, res, next) => {
  function getGoal(user) {
    let data = [];

    return Promise.all(
      user.onGoingGoals.map(async (element) => {
        data.push(await Goal.findById(element.goal_id));
        return;
      })
    ).then(() => {
      data.sort((a, b) => {
        return a - b;
      });
      return data;
    });
  }

  User.findOne({ _id: req.userData.userId }).then(async (user) => {
    res.status(200).json(await getGoal(user));
  });
};

exports.check_in = (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      user.onGoingGoals.forEach((element) => {
        if (element.goal_id == req.params.goal_id) {
          element.check_in += req.params.check_in_time;
          Goal.findById(element.goal_id).then((goal) => {
            if (element.check_in == goal.frequency) {
              element.check_in = 0;
              if (goal.period == "Daily") {
                element.progress = element.progress + (1 / goal.timespan) * 100;
                parseFloat(element.progress) +
                  ((1 / parseFloat(goal.timespan)) * 100).toFixed(3);
              } else if (goal.period == "Weekly") {
                element.progress =
                  parseFloat(element.progress) +
                  ((7 / parseFloat(goal.timespan)) * 100).toFixed(3);
              }
              if (element.progress >= 99.99) {
                user.onGoingGoals.pull({ _id: element._id });
                user.completedGoals.push(req.params.goal_id);
                user.save();
                res.status(200).json({
                  Message: "Goal is accomplished",
                });
              } else {
                user.save();
                res.status(200).json({
                  Message: "Checked-in",
                });
              }
            }
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.get_all_public_goal = (req, res, next) => {
  Goal.find({ publicity: true })
    .then((result) => {
      result.sort((a, b) => {
        return a - b;
      });
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

exports.join_goal = (req, res, next) => {
  Goal.findById(req.params.goal_id).then((result) => {
    if (result.publicity == true) {
      User.updateOne(
        { _id: req.userData.userId },
        {
          $push: {
            onGoingGoals: {
              goal_id: req.params.goal_id,
              join_time: Date.now(),
              progress: 0,
              check_in: 0,
              check_in_successful_time: 0,
              accuracy: 0,
            },
          },
        }
      )
        .then(() => {
          res.status(200).json({
            Message: "join successful",
          });
        })
        .catch((err) => {
          res.status(500).json({
            Error: err,
          });
        });
    } else {
      res.status(400).json({
        Message: "goal is not public",
      });
    }
  });
};

exports.get_today_view = (req, res, next) => {
  function getGoal(user) {
    let data = [];
    return Promise.all(
      user.onGoingGoals.map(async (element) => {
        await Goal.findById(element.goal_id).then((element) => {
          if (element.period == "Daily") {
            data.push(element);
            return;
          } else if (element.period == "Weekly") {
            let date_now = new Date(Date.now());
            date_now.setHours(0, 0, 0, 0);
            let date_start = new Date(goal.startTime);
            date_start.setHours(0, 0, 0, 0);
            var diffDays = parseInt(
              (date_now - date_start) / (1000 * 60 * 60 * 24) + 1
            );
            if (diffDays % 7 == 0) {
              data.push(element);
              return;
            } else {
              return;
            }
          }
        });
      })
    ).then(() => {
      data.sort((a, b) => {
        return a - b;
      });
      return data;
    });
  }
  User.findOne({ _id: req.userData.userId }).then(async (user) => {
    res.status(200).json(await getGoal(user));
  });
};

exports.leaderboard = (req, res, next) => {
  User.find({ "onGoingGoals.goal_id": req.params.goal_id })
    .then((result) => {
      var data = [];
      result.forEach((element) => {
        var goal = element.onGoingGoals.find(
          (element) => element.goal_id == req.parmas.goal_id
        );
        data.push({ user_id: element._id, progress: goal.progress });
      });
      data.sort((a, b) => {
        return b.progress - a.progress;
      });
      res.status(200).json({
        Data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.goal_progress = (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      var data = user.onGoingGoals.find(
        (element) => element.goal_id == req.parmas.goal_id
      );
      res.status(200).json({
        Data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

const delete_check_in = schedule.scheduleJob("00 00 * * *", function () {
  User.updateMany(
    {},
    { $set: { "onGoingGoals.$[elem].check_in": 0 } },
    { multi: true, arrayFilters: [{ "elem.check_in": { $gt: 0 } }] }
  ).then((result) => {
    console.log(result);
  });
});

/*const calculate_accuracy = schedule.schedule.scheduleJob(
  "* * * * *",
  function () {
    let date_now = new Date(Date.now());
    date_now.setHours(0, 0, 0, 0);
    let date_start = new Date();
    User.find({}).then((user) => {
      user.forEach((element) => {
        element.onGoingGoals.foreach((personal_goal) => {
          Goal.findById(personal_goal.goal_id).then((goal) => {
            if (goal.period == "Daily") {
              date_start = goal.startTime()
              personal_goal.accuracy = personal_goal.progress / 1;
            }
          });
        });
      });
    });
  }
);*/
