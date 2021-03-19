const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");
const { route } = require("./goal");

router.post("/signup", UserController.user_signup);

router.post("/login", UserController.user_login);

router.delete("/logout", checkAuth, UserController.user_logout);

router.delete("/", checkAuth, UserController.user_delete);

module.exports = router;
