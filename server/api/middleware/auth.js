const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  jwt.verify(
    req.cookies.token,
    process.env.JWT_TOKEN,
    async (error, decoded) => {
      if (decoded) {
        req.userData = decoded;
        next();
      } else if (error.message === "TokenExpiredError") {
        return res
          .status(403)
          .send({ sucess: false, message: "Token expired" });
      } else {
        res.status(401).json({
          message: "Auth failed",
        });
      }
    }
  );
};
