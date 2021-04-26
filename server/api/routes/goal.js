const express = require("express");
const router = express.Router();

const GoalController = require("../controllers/goal");

const checkAuth = require("../middleware/auth");
const checkAdmin = require("../middleware/admin");
const { route } = require("./user");

// a get route for read all goal
router.get("/", checkAuth, GoalController.read_all_goal);

// a get route for get today view
router.get("/today_view", checkAuth, GoalController.get_today_view);

// a get route for get all public goal
router.get("/public_goal", checkAuth, GoalController.get_all_public_goal);

// a get route for get leaderboard
router.get("/leaderboard/:goal_id", checkAuth, GoalController.leaderboard);

// a get route for get goal progress
router.get("/progress/:goal_id", checkAuth, GoalController.goal_progress);

// a get route for get a goal
router.get("/:id", checkAuth, GoalController.get_a_goal);

// a post route for add goal
router.post("/", checkAuth, GoalController.add_goal);

// a put route for update goal
router.put("/", checkAuth, GoalController.update_goal);

// a put route for check in
router.put("/check_in", checkAuth, GoalController.check_in);

// a put route for join goal
router.put("/join", checkAuth, GoalController.join_goal);

// a delete route for remove goal, required check admin
router.delete("/:goal_id", checkAuth, checkAdmin, GoalController.remove_goal);

// a delete route for quit goal
router.delete("/quit/:goal_id", checkAuth, GoalController.quit_goal);

module.exports = router;
