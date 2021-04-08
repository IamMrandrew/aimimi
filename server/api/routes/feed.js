const express = require("express");
const router = express.Router();

const FeedController = require("../controllers/feed");

const checkAuth = require("../middleware/auth");

router.get("/", checkAuth, FeedController.get_one_user_feed);

router.get("/get_feed_view/:goal_id", checkAuth, FeedController.get_feed_view);

router.post("/like", checkAuth, FeedController.like_feed);

router.delete("/unlike/:feed_id", checkAuth, FeedController.unlike_feed);

router.post("/add_comment", checkAuth, FeedController.add_comment);

router.put("/update_comment", checkAuth, FeedController.update_comment);

router.delete(
  "/delete_comment/:comment_id",
  checkAuth,
  FeedController.delete_comment
);

router.put("/like_comment/:comment_id", checkAuth, FeedController.like_comment);

router.delete(
  "/unlike_comment/:comment_id",
  checkAuth,
  FeedController.unlike_comment
);

module.exports = router;
