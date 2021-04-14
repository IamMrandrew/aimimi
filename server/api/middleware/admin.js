const User = require("../models/user");

module.exports = (req, res, next) => {
  User.findById(req.userData.userId).then((user) => {
    if (user.role == "admin") {
      next();
    } else {
      return res.status(401).json("Not an admin");
    }
  });
};
