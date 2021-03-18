const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");

router.post("/", UserController.user_signup);

router.put("/", UserController.user_login);

router.delete("/", checkAuth, UserController.user_delete);

module.exports = router;
