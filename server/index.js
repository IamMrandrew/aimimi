const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

const userRoutes = require("./api/routes/user");
const goalRoutes = require("./api/routes/goal");
const feedRoutes = require("./api/routes/feed");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successful connection");
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/goal", goalRoutes);
app.use("/feed", feedRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Server is running!!");
  });
}

module.exports = app;
const server = app.listen(process.env.PORT);
