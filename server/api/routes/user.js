const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");
const checkAdmin = require("../middleware/admin");
const { route } = require("./goal");
var multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
const storage = new GridFsStorage({
  url: process.env.MONGO_URL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "propics",
        };
        resolve(fileInfo);
        console.log(fileInfo);
      });
    });
  },
});
var upload = multer({ storage });

router.post("/signup", upload.single("img"), UserController.user_signup);

router.get("/verify/:random_string", UserController.verify);

router.post("/login", UserController.user_login);

router.get("/", checkAuth, UserController.user_info);

router.get("/other_user/:user_id", checkAuth, UserController.other_user_info);

router.get("/propic", checkAuth, UserController.user_propic);

router.get("/propic/:user_id", checkAuth, UserController.other_user_propic);

router.post(
  "/add_propic",
  checkAuth,
  upload.single("img"),
  UserController.add_propic
);

router.delete("/logout", checkAuth, UserController.user_logout);

router.delete("/:user_id", checkAuth, checkAdmin, UserController.user_delete);

router.get("/name/:id", UserController.other_user_name);

module.exports = router;
