const mongoose = require("mongoose");

require("dotenv").config();
const userRoutes = require("./api/routes/user");
const goalRoutes = require("./api/routes/goal");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("successful connection");
});

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// handle ALL requests
app.all("/", function (req, res) {
  // send this to client
  res.send("Hello World!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", userRoutes);
app.use("/", goalRoutes);

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

const server = app.listen(process.env.PORT);
