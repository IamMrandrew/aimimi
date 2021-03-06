const mongoose = require("mongoose");
const schedule = require("node-schedule");

const Goal = require("../models/goal");
const User = require("../models/user");
const Feed = require("../models/feed");
const FeedController = require("../controllers/feed");
const { exists } = require("../models/goal");
function calculate_accuracy() {
  let date_now = new Date(Date.now());
  date_now.setUTCHours(0, 0, 0, 0);
  User.find({}).then((user) => {
    user.forEach((element) => {
      let data = [];
      Promise.all(
        element.onGoingGoals.map(async (personal_goal) => {
          if (personal_goal.goal_id) {
            if (personal_goal.progress != 0) {
              await Goal.findById(personal_goal.goal_id).then((goal) => {
                if (goal.period == "Daily") {
                  let date_start = new Date(personal_goal.join_time);
                  date_start.setUTCHours(0, 0, 0, 0);
                  personal_goal.accuracy =
                    (personal_goal.progress /
                      ((((date_now - date_start) / (1000 * 60 * 60 * 24) + 1) /
                        goal.timespan) *
                        100)) *
                    100;
                  data.push(personal_goal);
                  return;
                } else if (goal.period == "Weekly") {
                  let date_start = new Date(personal_goal.join_time);
                  date_start.setUTCHours(0, 0, 0, 0);
                  if (
                    ((date_now - date_start) / (1000 * 60 * 60 * 24)) % 7 ==
                    0
                  ) {
                    personal_goal.accuracy =
                      (personal_goal.progress /
                        (((date_now - date_start) /
                          (1000 * 60 * 60 * 24) /
                          goal.timespan) *
                          100)) *
                      100;
                    data.push(personal_goal);
                    return;
                  }
                }
              });
            } else return;
          } else return;
        })
      ).then(() => {
        data.forEach(async (data) => {
          if (data) {
            await User.findOneAndUpdate(
              {
                $and: [
                  { _id: element._id },
                  { "onGoingGoals.goal_id": data.goal_id },
                ],
              },
              { $set: { "onGoingGoals.$.accuracy": data.accuracy } }
            );
          }
        });
      });
    });
  });
}
exports.add_goal = (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      const goal = new Goal({
        _id: new mongoose.Types.ObjectId(),
        createdBy: user._id,
        title: req.body.title,
        startTime: Date.now(),
        category: req.body.category,
        frequency: req.body.frequency,
        period: req.body.period,
        publicity: req.body.publicity,
        timespan: req.body.timespan,
      });
      goal.save((err) => {
        if (err) {
          console.log(err);
        }
      });
      FeedController.add_feed(
        goal._id,
        req.userData.userId,
        user.username + ' has created "' + goal.title + '" goal!'
      );
      user
        .updateOne({
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
        })
        .then(() => {
          return res.status(200).json({
            message: "Goal added",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
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
  Goal.findOne({ _id: req.params.goal_id }).then((result) => {
    result.remove();
  });
  User.updateMany(
    {},
    { $pull: { onGoingGoals: { goal_id: req.params.goal_id } } },
    { multi: true }
  )
    .then(() => {
      FeedController.remove_feed(req.params.goal_id);
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
  User.findOneAndUpdate(
    {
      _id: req.userData.userId,
    },
    { $pull: { onGoingGoals: { goal_id: req.params.goal_id } } }
  )
    .then((user) => {
      Goal.findById(req.params.goal_id).then((goal) => {
        FeedController.add_feed(
          req.params.goal_id,
          req.userData.userId,
          user.username + ' has quitted "' + goal.title + '" goal.'
        );
        res.status(200).json({
          message: "Goal quited",
        });
      });
    })
    .catch((err) => {
      console.log(err);
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
        return a.startTime - b.startTime;
      });
      return data;
    });
  }

  User.findOne({ _id: req.userData.userId }).then(async (user) => {
    res.status(200).json(await getGoal(user));
  });
};

exports.get_a_goal = (req, res, next) => {
  User.findOne({ _id: req.userData.userId }).then(async (user) => {
    try {
      res.status(200).json(await Goal.findById(req.params.id));
    } catch (err) {
      res.status(500).json({
        Error: err,
      });
    }
  });
};

exports.check_in = (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      user.onGoingGoals.forEach((element) => {
        if (element.goal_id == req.body.goal_id) {
          element.check_in = Number(req.body.check_in_time);
          Goal.findById(element.goal_id).then((goal) => {
            if (element.check_in == goal.frequency) {
              element.check_in_successful_time += 1;
              FeedController.add_feed(
                element.goal_id,
                req.userData.userId,
                user.username +
                  ' has successfully checked in "' +
                  goal.title +
                  '" goal.'
              );
              if (goal.period == "Daily") {
                element.progress = element.progress + (1 / goal.timespan) * 100;
                parseFloat(element.progress) +
                  ((1 / parseFloat(goal.timespan)) * 100).toFixed(3);
              } else if (goal.period == "Weekly") {
                element.progress =
                  parseFloat(element.progress) +
                  ((7 / parseFloat(goal.timespan)) * 100).toFixed(3);
              }

              element.accuracy = calculate_accuracy_for_one(element, goal);

              if (element.progress >= 99.99) {
                user.onGoingGoals.pull({ _id: element._id });
                user.completedGoals.push(req.body.goal_id);
                user.save();
                res.status(200).json({
                  Message: "Goal is accomplished",
                });
              } else {
                user.save().then(() => {
                  res.status(200).json({
                    Message: "Enough Checked-in, added to progress",
                  });
                });
              }
            } else {
              user.save();
              res.status(200).json({
                Message: "Checked-in",
              });
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

const calculate_accuracy_for_one = (element, goal) => {
  let date_now = new Date(Date.now());
  date_now.setUTCHours(0, 0, 0, 0);

  let date_start = new Date(element.join_time);
  date_start.setUTCHours(0, 0, 0, 0);

  const diffDay = (date_now - date_start) / (1000 * 60 * 60 * 24) + 1;
  console.log("DATE_NOW", date_now);
  console.log("DATE_START", date_start);
  console.log("PROGRESS", element.progress);
  console.log("DIFFDAY", diffDay);
  console.log("ACCURACY", element.accuracy);
  return (element.progress / ((diffDay / goal.timespan) * 100)) * 100;
};

exports.get_all_public_goal = (req, res, next) => {
  Goal.find({ publicity: true })
    .populate("createdBy")
    .then((result) => {
      result.sort((a, b) => {
        return a - b;
      });
      res.status(200).json({
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

exports.join_goal = (req, res, next) => {
  Goal.findById(req.body.goal_id).then((goal) => {
    if (goal.publicity == true) {
      User.findOneAndUpdate(
        { _id: req.userData.userId },
        {
          $push: {
            onGoingGoals: {
              goal_id: req.body.goal_id,
              join_time: Date.now(),
              progress: 0,
              check_in: 0,
              check_in_successful_time: 0,
              accuracy: 0,
            },
          },
        }
      )
        .then((user) => {
          FeedController.add_feed(
            goal._id,
            req.userData.userId,
            user.username + ' has joined "' + goal.title + '" goal!'
          );
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
        await Goal.findById(element.goal_id).then((goal) => {
          if (goal.period == "Daily") {
            data.push(goal);
            return;
          } else if (goal.period == "Weekly") {
            let date_now = new Date(Date.now());
            date_now.setUTCHours(0, 0, 0, 0);
            let date_start = new Date(element.join_time);
            date_start.setUTCHours(0, 0, 0, 0);
            var diffDays = parseInt(
              (date_now - date_start) / (1000 * 60 * 60 * 24)
            );
            if (diffDays % 7 == 0) {
              data.push(goal);
              return;
            } else {
              return;
            }
          }
        });
      })
    ).then(() => {
      data.sort((a, b) => {
        return a.startTime - b.startTime;
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
      let data = [];
      result.forEach((element) => {
        element.onGoingGoals.forEach((goal) => {
          if (goal.goal_id == req.params.goal_id) {
            data.push({
              _id: element._id,
              username: element.username,
              accuracy: goal.accuracy,
            });
          }
        });
      });

      data.sort((a, b) => {
        return b.accuracy - a.accuracy;
      });
      res.status(200).json({
        data,
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
      // var data = user.onGoingGoals.find(
      //   (element) => element.goal_id == req.parmas.goal_id
      // );

      // Idk why this code dont work, but i dont work lol

      let data;
      for (const element of user.onGoingGoals) {
        if (element.goal_id == req.params.goal_id) {
          data = element;
        }
      }
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
  Goal.find({ period: "Daily" }).then((daily_goal) => {
    daily_goal.forEach(async (goal) => {
      await User.updateMany(
        {},
        { $set: { "onGoingGoals.$[elem].check_in": 0 } },
        { multi: true, arrayFilters: [{ "elem.goal_id": goal._id }] }
      );
    });
  });
  User.find({}).then((user) => {
    user.forEach(async (element) => {
      if (element.onGoingGoals.length != 0) {
        await element.onGoingGoals.forEach(async (personal_goal) => {
          let date_start = new Date(personal_goal.join_time);
          date_start.setUTCHours(0, 0, 0, 0);
          let date_now = new Date(Date.now());
          date_now.setUTCHours(0, 0, 0, 0);
          if (((date_now - date_start) / (1000 * 60 * 60 * 24)) % 7 == 0) {
            await User.findOneAndUpdate(
              {
                $and: [
                  { _id: element._id },
                  { "onGoingGoals.goal_id": personal_goal.goal_id },
                ],
              },
              { $set: { "onGoingGoals.$.check_in": 0 } }
            );
          }
        });
      }
    });
  });
});

const daily_calculate_accuracy = schedule.scheduleJob(
  "00 00 * * *",
  calculate_accuracy
);
