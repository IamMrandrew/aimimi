const express = require("express");
const router = express.Router();

const GoalController = require('../controllers/goal');

const checkAuth = require('../middleware/auth');

router.post("/add_goal", checkAuth, GoalController.add_goal);

router.post("/update_goal", checkAuth, GoalController.update_goal);

router.delete("/delete_goal", checkAuth, GoalController.remove_goal);

module.exports = router;