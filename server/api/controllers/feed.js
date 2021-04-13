const mongoose = require("mongoose");

const Feed = require("../models/feed");
const User = require("../models/user");

exports.add_feed = (goal_id, creator, content) => {
  const feed = new Feed({
    _id: new mongoose.Types.ObjectId(),
    goal_id: goal_id,
    creator: creator,
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
    if (feed.participant.indexOf(req.userData.userId) != -1) {
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
    } else {
      res.status(400).send("not a participant");
    }
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
    if (feed.participant.indexOf(req.userData.userId) != -1) {
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
    } else res.status(400).send("not a participant");
  });
};

exports.unlike_comment = (req, res, next) => {
  Feed.findById(req.body.feed_id).then((feed) => {
    if (feed.participant.indexOf(req.userData.userId) != -1) {
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
    } else res.status(400).send("not a participant");
  });
};

exports.get_feed_view = (req, res, next) => {
  Feed.findOne({ goal_id: req.params.goal_id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.get_one_user_feed = (req, res, next) => {
  Feed.find({ participant: req.userData.userId })
    .populate("creator")
    .then((result) => {
      result.sort((a, b) => {
        return b.created_time - a.created_time;
      });
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
