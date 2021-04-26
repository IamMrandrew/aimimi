const jwt = require("jsonwebtoken");

// middleware for verifying a jsonwebtoken and get the decoded data
module.exports = (req, res, next) => {
  jwt.verify(
    req.cookies.token,
    process.env.JWT_TOKEN,
    async (error, decoded) => {
      if (error) {
        if (error.message === "TokenExpiredError") {
          return res
            .status(403)
            .send({ sucess: false, message: "Token expired" });
        } else {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
      }

      if (decoded) {
        req.userData = decoded;
        next();
      }
    }
  );
};
