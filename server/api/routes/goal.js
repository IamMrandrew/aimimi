const express = require("express");
const router = express.Router();

const GoalController = require("../controllers/goal");

const checkAuth = require("../middleware/auth");

router.post("/goal", checkAuth, GoalController.add_goal);

router.put("/goal", checkAuth, GoalController.update_goal);

router.delete("/goal", checkAuth, GoalController.remove_goal);

module.exports = router;
