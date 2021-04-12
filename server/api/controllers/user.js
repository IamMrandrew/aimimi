const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Grid = require("gridfs-stream");

exports.user_signup = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((exist) => {
      if (exist != null) {
        return res.status(409).json({
          message: "Duplicate Email",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
              message: "Hashing failed",
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash,
              joinDate: Date.now(),
              propic: req.file.originalname,
            });
            user
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                  message: "Database error",
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user == null) {
        return res.status(401).json({
          message: "User does not exist",
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id,
            },
            process.env.JWT_TOKEN
            //{
            //expiresIn: "1h"
            //}
          );
          return res
            .status(200)
            .cookie("token", token, {
              sameSite: "strict",
              path: "/",
              expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
              httpOnly: true,
              // secure: true,
            })
            .send("Logged in");
        }
        res.status(401).json({
          message: "Incorrect password",
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.user_info = (req, res, next) => {
  User.findById(req.userData.userId)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
};

exports.other_user_info = (req, res, next) => {
  User.findById(req.params.user_id)
    .then((user) => {
      res.status.end(user);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
};

exports.user_propic = (req, res, next) => {
  User.findOne({ _id: req.userData.userId })
    .then((user) => {
      const db = mongoose.connection;
      let gridfs = Grid(db.db, mongoose.mongo);
      gridfs.collection("propics");
      gridfs.files.findOne({ filename: user.propic }, (err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: "No file exists",
          });
        }
        if (
          file.contentType === "image/jpeg" ||
          file.contentType === "image/png"
        ) {
          const readstream = gridfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: "Not an image",
          });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: err,
      });
    });
};

exports.user_logout = (req, res, next) => {
  res.status(202).clearCookie("token").json({
    message: "Logged out",
  });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.userData.userId })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
