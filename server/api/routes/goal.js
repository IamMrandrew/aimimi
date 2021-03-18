const express = require("express");
const router = express.Router();

const GoalController = require("../controllers/goal");

const checkAuth = require("../middleware/auth");

router.get("/", checkAuth, GoalController.read_all_goal);

router.post("/", checkAuth, GoalController.add_goal);

router.put("/", checkAuth, GoalController.update_goal);

router.delete("/", checkAuth, GoalController.remove_goal);

module.exports = router;
