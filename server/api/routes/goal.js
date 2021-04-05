const express = require("express");
const router = express.Router();

const GoalController = require("../controllers/goal");

const checkAuth = require("../middleware/auth");
const { route } = require("./user");

router.get("/", checkAuth, GoalController.read_all_goal);

router.post("/", checkAuth, GoalController.add_goal);

router.put("/", checkAuth, GoalController.update_goal);

router.delete("/:goal_id", checkAuth, GoalController.remove_goal);

router.delete("/quit/:goal_id", checkAuth, GoalController.quit_goal);

router.put(
  "/check_in/:goal_id/:check_in_time",
  checkAuth,
  GoalController.check_in
);

router.get("/public_goal", checkAuth, GoalController.get_all_public_goal);

router.put("/join/:goal_id", checkAuth, GoalController.join_goal);

router.get("/today_view", checkAuth, GoalController.get_today_view);

router.get("/leaderboard/:goal_id", checkAuth, GoalController.leaderboard);

router.get("/progress/:goal_id", checkAuth, GoalController.goal_progress);

module.exports = router;
