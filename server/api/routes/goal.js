const express = require("express");
const router = express.Router();

const GoalController = require("../controllers/goal");

const checkAuth = require("../middleware/auth");
const { route } = require("./user");

router.get("/goal", checkAuth, GoalController.read_all_goal);

router.post("/goal", checkAuth, GoalController.add_goal);

router.put("/goal", checkAuth, GoalController.update_goal);

router.delete("/goal", checkAuth, GoalController.remove_goal);

router.put("/check_in", checkAuth, GoalController.check_in);

router.get("/public_goal", checkAuth, GoalController.get_all_public_goal);

router.put("/join", checkAuth, GoalController.join_goal);

router.get("/today_view", checkAuth, GoalController.get_today_view);

module.exports = router;
