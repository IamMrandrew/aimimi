const mongoose = require("mongoose");

const Feed = require("../models/feed");
const User = require("../models/user");

exports.add_feed = (goal_id, creator, content) => {
  const feed = new Feed({
    _id: new mongoose.Types.ObjectId(),
    goal_id: goal_id,
    creator: creator,
    participant: creator,
    created_time: Date.now(),
    content: content,
  });
  feed.save((err) => {
    if (err) {
      console.log(err);
    }
  });
};

exports.join_feed = (goal_id, user_id) => {
  Feed.findOneAndUpdate(
    { goal_id: goal_id },
    { $push: { participant: user_id } }
  ).then((result) => {
    console.log(result);
  });
};

exports.quit_feed = (goal_id, user_id) => {
  Feed.findOneAndUpdate(
    { goal_id: goal_id },
    { $pull: { participant: user_id } }
  ).then((result) => {
    console.log(result);
  });
};

exports.remove_feed = (goal_id) => {
  Feed.findByIdAndDelete({ goal_id: goal_id }).then((result) => {
    console.log(result);
  });
};

exports.like_feed = (req, res, next) => {
  Feed.findOneAndUpdate(
    // { _id: req.body.feed_id },
    { _id: req.params.feed_id },
    { $push: { like: req.userData.userId } }
  )
    .then((result) => {
      res.status(200).send("Liked");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.unlike_feed = (req, res, next) => {
  Feed.findOneAndUpdate(
    { _id: req.params.feed_id },
    { $pull: { like: req.userData.userId } }
  )
    .then((result) => {
      console.log(result);
      res.status(200).send("Unliked");
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.add_comment = (req, res, next) => {
  Feed.findById(req.body.feed_id).then((feed) => {
    feed
      .updateOne({
        $push: {
          comment: {
            creator: req.userData.userId,
            created_time: Date.now(),
            content: req.body.content,
          },
        },
      })
      .then((result) => {
        console.log(result);
        res.status(200).send("added comment");
      });
  });
};

exports.update_comment = (req, res, next) => {
  Feed.findById(req.body.feed_id).then((feed) => {
    if (
      feed.comment
        .map((e) => {
          return e.creator;
        })
        .indexOf(req.userData.userId) != -1
    ) {
      feed
        .updateOne(
          {
            $set: {
              "comment.$[elem].content": req.body.content,
              "comment.$[elem].last_updated_time": Date.now(),
            },
          },
          { arrayFilters: [{ "elem._id": req.body.comment_id }] }
        )
        .then((result) => {
          console.log(result);
          res.status(200).send("updated comment");
        });
    } else res.status(400).send("not the creator");
  });
};

exports.delete_comment = (req, res, next) => {
  Feed.findById(req.body.feed_id).then((feed) => {
    if (
      feed.comment
        .map((e) => {
          return e.creator;
        })
        .indexOf(req.userData.userId) != -1
    ) {
      feed
        .updateOne({
          $pull: {
            comment: { _id: req.params.comment_id },
          },
        })
        .then((result) => {
          console.log(result);
          res.status(200).send("deleted comment");
        });
    } else res.status(400).send("not a participant");
  });
};

exports.like_comment = (req, res, next) => {
  Feed.findById(req.body.feed_id).then((feed) => {
    feed
      .updateOne(
        {
          $set: {
            "comment.$[elem].like": req.userData.userId,
          },
        },
        { arrayFilters: [{ "elem._id": req.body.comment_id }] }
      )
      .then((result) => {
        console.log(result);
        res.status(200).send("liked comment");
      });
  });
};

exports.unlike_comment = (req, res, next) => {
  Feed.findById(req.body.feed_id).then((feed) => {
    feed
      .updateOne(
        {
          $pull: {
            "comment.$[elem].like": req.userData.userId,
          },
        },
        { arrayFilters: [{ "elem._id": req.body.comment_id }] }
      )
      .then((result) => {
        console.log(result);
        res.status(200).send("unliked comment");
      });
  });
};

exports.get_feed_view = (req, res, next) => {
  Feed.findOne({ _id: req.params.feed_id })
    .populate("creator comment.creator")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.get_one_user_feed = (req, res, next) => {
  User.findById(req.userData.userId).then((user) => {
    let data = [];
    Promise.all(
      user.onGoingGoals.map(async (goal) => {
        await Feed.find({ goal_id: goal.goal_id })
          .populate("creator")
          .then((feed) => {
            data.push(...feed);
            return;
          });
      })
    ).then(() => {
      data.sort((a, b) => {
        return b.created_time - a.created_time;
      });
      res.status(200).json(data);
    });
  });
};
