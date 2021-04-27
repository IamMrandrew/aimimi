const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const checkAuth = require("../middleware/auth");
const checkAdmin = require("../middleware/admin");
const { route } = require("./goal");
var multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");
// for processing file request
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
      });
    });
  },
});
// for uploading file info to database
var upload = multer({ storage });

// post route for sign up
router.post("/signup", upload.single("img"), UserController.user_signup);

// get route for verify email
router.get("/verify/:random_string", UserController.verify);

// post route for login
router.post("/login", UserController.user_login);

// get route for get user info
router.get("/", checkAuth, UserController.user_info);

//get route for get all user info, requries check admin
router.get("/all", checkAuth, checkAdmin, UserController.all_user_info);

// get route for get other user info
router.get("/other_user/:user_id", checkAuth, UserController.other_user_info);

// get route for get user propic
router.get("/propic", checkAuth, UserController.user_propic);

// get route for get other user propic
router.get("/propic/:user_id", checkAuth, UserController.other_user_propic);

// post route for add propic
router.post(
  "/add_propic",
  checkAuth,
  upload.single("img"),
  UserController.add_propic
);

// delete route for logout
router.delete("/logout", checkAuth, UserController.user_logout);

// delete route for delete user, requries check admin
router.delete("/:user_id", checkAuth, checkAdmin, UserController.user_delete);

// get route for get otehr user name
router.get("/name/:id", UserController.other_user_name);

module.exports = router;
