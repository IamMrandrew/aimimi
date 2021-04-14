const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (email, randomString) => {
  let transoprt = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_ACCOUNT,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  let text;
  process.env.NODE_ENV == "development"
    ? (text =
        "Welcome to Aimimi! Please click http://localhost:3001/user/verify/" +
        randomString +
        " to verify your email.")
    : (text =
        "Welcome to Aimimi! Please click http://aimimi.herokuapp.com/user/verify/" +
        randomString +
        " to verify your email.");
  let mailOptions = {
    from: "Aimimi",
    to: email,
    subject: "Aimimi Email Confirmation",
    text: text,
  };
  transoprt.sendMail(mailOptions, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent");
    }
  });
};

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
              randomString: crypto.randomBytes(16).toString("hex"),
              isValid: false,
              role: "User",
              username: req.body.username,
              email: req.body.email,
              password: hash,
              joinDate: Date.now(),
              propic: "image.jpg",
            });
            sendEmail(req.body.email, user.randomString);
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

exports.verify = (req, res, next) => {
  console.log(req.params.random_string);
  User.findOne({ randomString: req.params.random_string })
    .then((user) => {
      if (user) {
        user.isValid = true;
        user.save().then(() => {
          console.log("verified");
          res.status(200).json("User verified");
        });
      } else {
        res.status(500).json("User not found");
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.user_login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user == null) {
        return res.status(401).json({
          message: "User does not exist",
        });
      }
      if (user.isValid == false) {
        return res.status(400).json("Email not yet verified");
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
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).end(err);
    });
};

exports.add_propic = (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.userData.userId },
    { $set: { propic: req.file.originalname } }
  )
    .then(() => {
      res.status(200).json("Propic added");
    })
    .catch((err) => {
      res.status(500).json(err);
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
          let data = [];

          readstream.on("data", (chunk) => {
            data.push(chunk);
          });
          readstream.on("end", () => {
            data = Buffer.concat(data);
            let img =
              "data:image/png;base64," + Buffer(data).toString("base64");
            res.end(img);
          });
          readstream.on("error", (err) => {
            res.status(500).send(err);
            console.log("An error occurred!", err);
          });
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

exports.other_user_propic = (req, res, next) => {
  User.findOne({ _id: req.params.user_id })
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
          let data = [];

          readstream.on("data", (chunk) => {
            data.push(chunk);
          });
          readstream.on("end", () => {
            data = Buffer.concat(data);
            let img =
              "data:image/png;base64," + Buffer(data).toString("base64");
            res.end(img);
          });
          readstream.on("error", (err) => {
            res.status(500).send(err);
            console.log("An error occurred!", err);
          });
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

exports.other_user_name = (req, res, next) => {
  User.findOne({ _id: req.params.id }).then(async (user) => {
    try {
      res.status(200).send(user.username);
    } catch (err) {
      res.status(500).json({
        Error: err,
      });
    }
  });
};

exports.user_logout = (req, res, next) => {
  res.status(202).clearCookie("token").json({
    message: "Logged out",
  });
};

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.user_id })
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
