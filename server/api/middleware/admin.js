const User = require("../models/user");

// middleware for checking user's role
module.exports = (req, res, next) => {
  User.findById(req.userData.userId).then((user) => {
    if (user.role == "Admin") {
      next();
    } else {
      return res.status(401).json("Not an admin");
    }
  });
};
