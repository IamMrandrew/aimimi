const express = require("express");
const router = express.Router();

const FeedController = require("../controllers/feed");
const checkAuth = require("../middleware/auth");

// a get route for get user feed
router.get("/", checkAuth, FeedController.get_one_user_feed);

// a get route for get feed view
router.get("/:feed_id", checkAuth, FeedController.get_feed_view);

// a get route for like feed
router.post("/like/:feed_id", checkAuth, FeedController.like_feed);

// a delete route for unlike feed
router.delete("/unlike/:feed_id", checkAuth, FeedController.unlike_feed);

// a post route for add comment
router.post("/add_comment", checkAuth, FeedController.add_comment);

// a put route for update comment
router.put("/update_comment", checkAuth, FeedController.update_comment);

// a delete route for delete comment
router.delete(
  "/delete_comment/:comment_id",
  checkAuth,
  FeedController.delete_comment
);

//a put route for like comment
router.put("/like_comment/:comment_id", checkAuth, FeedController.like_comment);

// a delete route for unlike comment
router.delete(
  "/unlike_comment/:comment_id",
  checkAuth,
  FeedController.unlike_comment
);

module.exports = router;
