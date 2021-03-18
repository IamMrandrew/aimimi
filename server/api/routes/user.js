const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");

router.post("/user", UserController.user_signup);

router.put("/user", UserController.user_login);

router.delete("/user", checkAuth, UserController.user_delete);

module.exports = router;
