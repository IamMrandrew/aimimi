const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

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

const app = express();

// // handle ALL requests
// app.all("/", function (req, res) {
//   // send this to client
//   res.send("Hello World!");
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/goal", goalRoutes);

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
